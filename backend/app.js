const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require('cors');
const shortid = require('shortid');
const Razorpay = require('razorpay');
const couponRoute = require('./routes/couponRoute');
const subscriberRoutes = require('./routes/subscriberRoutes');

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// initialize razorpay credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_LIVE_API_KEY,
  key_secret: process.env.RAZORPAY_LIVE_API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/logo.png', (req, res) => {
  res.sendFile(path.join(__dirname, "logo.png"));
});

app.post('/api/v1/razorpay', async (req, res) => {
  const payment_capture = 1;
  const amount = req.body.amount;
  const currency = 'INR';

  const options = {
    amount: amount,
    currency: currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to send Razorpay key to frontend
app.get('/api/v1/razorpay-key', (req, res) => {
  res.json({ key: process.env.RAZORPAY_LIVE_API_KEY });
});

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use('/api/v1/coupon', couponRoute);
app.use('/api/v1/subscribers', subscriberRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

module.exports = app;