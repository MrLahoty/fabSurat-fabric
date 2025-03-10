const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { 
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
        phoneNo: {
            type: Number,
            required: true,
        },
    },
    orderItems: [
        {
            name: { 
                type: String,
                required: true,
            }, 
            price: { 
                type: Number,
                required: true,
            }, 
            quantity: { 
                type: Number,
                required: true,
            }, 
            image: { 
                type: String,
                required: true,
            }, 
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true,
            },
            size: { // New field for readymade product sizes
                type: String,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    paymentInfo: {
        id: { 
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
    },
    paidAt: {
        type: Date,
        required: true,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing",
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
    trackingId: { // Add this line for tracking ID
        type: String,
        default: null,
    },
});

// Virtual property to get formatted order items with price
orderSchema.virtual("formattedOrderItems").get(function () {
    return this.orderItems.map((item) => ({
        ...item,
        formattedPrice: parseFloat(item.price).toFixed(2), // Format the price
    }));
});

module.exports = mongoose.model("Order", orderSchema);