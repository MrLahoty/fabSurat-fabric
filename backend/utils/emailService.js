const nodemailer = require('nodemailer');

// Create a transporter using your email provider's SMTP
const transporter = nodemailer.createTransport({
  service: process.env.SMPT_SERVICE, // Replace with your email service
  auth: {
    user: process.env.SMPT_MAIL, // Your email address
    pass: process.env.SMPT_PASSWORD, // Your email password or app password
  },
});

async function sendOrderConfirmationEmail(to, orderDetails) {
  const orderItems = orderDetails.orderItems.map(item => `
    <tr>
      <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;"></td>
      <td>${item.name}</td>
      <td>₹${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>₹${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.SMPT_MAIL, // Sender address
    to: to, // Recipient address
    subject: 'Order Confirmation', // Subject line
    html: `
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
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = {
  sendOrderConfirmationEmail,
};
