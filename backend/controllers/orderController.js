const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { sendOrderConfirmationEmail } = require("../utils/emailService");

// Cancel Order
exports.cancelOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this ID", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You cannot cancel a delivered order", 400));
    }

     // Restore stock for each product in the order
     for (const item of order.orderItems) {
        await restoreStock(item.product, item.quantity);
    }

    order.orderStatus = "Cancelled";
    await order.save();
  
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
});

// Function to restore stock when an order is cancelled
async function restoreStock(productId, quantity) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    product.Stock += quantity;

    await product.save({ validateBeforeSave: false });
}


// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // Ensure each order item includes a size if it's a readymade product
    const updatedOrderItems = orderItems.map(item => ({
        ...item,
        size: item.size || null, // Add size only if it's provided (i.e., for readymade products)
    }));

    // Create order
    const order = await Order.create({
        shippingInfo,
        orderItems: updatedOrderItems,
        paymentInfo,
        itemsPrice: parseFloat(itemsPrice).toFixed(2), // Ensure price formatting
        shippingPrice: parseFloat(shippingPrice).toFixed(2),
        totalPrice: parseFloat(totalPrice).toFixed(2),
        paidAt: Date.now(),
        user: req.user._id,
    });

    // Decrease product stock as soon as the order is created
    order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
    });

    // Send order confirmation email
    const orderDetails = {
        orderId: order._id,
        orderItems: order.orderItems,
        totalPrice: order.totalPrice,
        shippingInfo: order.shippingInfo,
    };

    try {
        await sendOrderConfirmationEmail(req.user.email, orderDetails); // Send email to the user
    } catch (error) {
        return next(new ErrorHander("Error sending email", 500));
    }

    res.status(201).json({
        success: true,
        order,
    });
});

// Update stock immediately after order creation
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    if (product.Stock < quantity) {
        throw new ErrorHander("Insufficient stock for this product", 400);
    }

    product.Stock -= quantity;
    await product.save({ validateBeforeSave: false });
}


//Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

       // Format the prices for each order item
       order.orderItems.forEach(item => {
        item.product.price = parseFloat(item.product.price).toFixed(2);
    });

    res.status(200).json({
        success: true,
        order,
    });
});

//Get Logged in user Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user:req.user._id });

      // Format the prices for each order item
      orders.forEach(order => {
        order.orderItems.forEach(item => {
            item.product.price = parseFloat(item.product.price).toFixed(2);
        });
    });

    res.status(200).json({
        success: true,
        orders,
    });
});

//Get All Orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += parseFloat(order.totalPrice).toFixed(2); // Ensure total price formatting
    });

    res.status(200).json({
        success: true,
        totalAmount: parseFloat(totalAmount).toFixed(2), // Format totalAmount as well
        orders,
    });
});


// Update Order Status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    // Update the status and tracking ID
    order.orderStatus = req.body.status;
    if (req.body.trackingId) { // Check if trackingId is provided
        order.trackingId = req.body.trackingId; // Save tracking ID
    }

    if (req.body.status === "Shipped") {
        order.orderItems.forEach(async (o) => {
            await updateStock(o.product, o.quantity);
        });
    }

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    });
});

async function updateStock(id,quantity) {
    const product = await Product.findById(id);

    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
};

//Delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});