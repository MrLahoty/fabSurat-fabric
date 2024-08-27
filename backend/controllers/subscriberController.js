const Subscriber = require('../models/subscriber');
const nodemailer = require('nodemailer');

const subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ msg: 'Email already subscribed' });
    }

    subscriber = new Subscriber({ email });
    await subscriber.save();

    // Send welcome email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Welcome to Fabsurat – Your Gateway to Exquisite Fabrics and Readymades!',
      html: `
        <html>
        <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #479b8d;">Dear Valued Customer,</h2>
          <p>Thank you for subscribing to the Fabsurat newsletter! We are thrilled to have you as part of our community</p>
          <p>Stay tuned for exclusive offers, new arrivals, and the latest trends delivered straight to your inbox. We look forward to serving you with the best that Fabsurat has to offer.</p>
          <p>Warm regards,<br>
          The Fabsurat Team</p>
        </body>
        </html>
      `,
    };    

    // Send mail with improved error handling
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ msg: 'Failed to send email' });
      }
      console.log('Email sent: %s', info.messageId);
      res.json({ msg: 'Subscribed successfully' });
    });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = { subscribe };
