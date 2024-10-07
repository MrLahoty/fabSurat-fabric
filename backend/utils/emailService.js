const nodemailer = require('nodemailer');

// Create a transporter using your email provider's SMTP
const transporter = nodemailer.createTransport({
  service: process.env.SMPT_SERVICE, // Replace with your email service
  auth: {
    user: process.env.SMPT_MAIL, // Your email address
    pass: process.env.SMPT_PASSWORD, // Your email password or app password
  },
});

// Send order confirmation or cancellation email
async function sendOrderConfirmationEmail(to, orderDetails, status = 'created') {
  // Map order items for the email template
  const orderItems = orderDetails.orderItems.map(item => `
    <tr>
      <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
      <td>${item.name}</td>
      <td>₹${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>₹${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  // Define email subject and body based on the order status (created, cancelled, or tracking update)
  let subject;
  let bodyMessage;

  if (status === 'created') {
    subject = 'Order Confirmation';
    bodyMessage = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #4CAF50;">Thank you for your order!</h1>
        <p>Your order has been placed successfully. Here are your order details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Name</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItems}
          </tbody>
        </table>
        <h3 style="margin-top: 20px;">Total Price: ₹${orderDetails.totalPrice.toFixed(2)}</h3>
        <p style="margin-top: 20px;">Thank you for shopping with us! FabSurat</p>
      </div>
    `;
  } else if (status === 'cancelled') {
    subject = 'Order Cancellation';
    bodyMessage = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: red;">Your order has been cancelled</h1>
        <p>We regret to inform you that your order has been cancelled. Here are your order details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Name</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
              <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${orderItems}
          </tbody>
        </table>
        <h3 style="margin-top: 20px;">Total Price: ₹${orderDetails.totalPrice.toFixed(2)}</h3>
        <p style="margin-top: 20px;">We apologize for any inconvenience. If you have any questions, feel free to contact our support team! FabSurat</p>
      </div>
    `;
  } else if (status === 'trackingUpdate') {
    subject = 'Your Order Tracking ID has been Updated';
    bodyMessage = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #007BFF;">Your Order Tracking Update</h1>
        <p>Your order ID: ${orderDetails.orderId} has been updated with a new tracking ID:</p>
        <h3 style="margin: 10px 0;">Tracking ID: ${orderDetails.trackingId}</h3>
        <p>Current Status: ${orderDetails.orderStatus}</p>
        <p>If you have any questions, feel free to contact our support team! FabSurat</p>
      </div>
    `;
  }

  // Email options
  const mailOptions = {
    from: process.env.SMPT_MAIL, // Sender address
    to: to, // Recipient address
    subject: subject, // Subject based on the status
    html: bodyMessage, // Dynamic message body based on the status
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`${status === 'created' ? 'Order confirmation' : status === 'cancelled' ? 'Order cancellation' : 'Tracking update'} email sent to:`, to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  sendOrderConfirmationEmail,
};
