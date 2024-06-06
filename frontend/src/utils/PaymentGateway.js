export default async function displayRazorpay() {
    try {
      // Determine base URL based on environment
      const baseURL = process.env.NODE_ENV === 'PRODUCTION' ? 'http://localhost:4000' : 'https://fabsurat.onrender.com';
  
      // Fetch Razorpay key and other necessary data
      const { data: { key } } = await fetch(`${baseURL}/api/v1/razorpay-key`).then(response => response.json());
      const { data } = await fetch(`${baseURL}/api/v1/razorpay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount })  // Pass amount or other necessary data
      }).then(response => response.json());
  
      // Options for Razorpay
      const options = {
        key, // Use the fetched key here
        currency: data.currency,
        amount: data.amount,
        description: 'Wallet Transaction',
        image: `${baseURL}/logo.png`,
        order_id: data.id,
        handler: function () {
          window.location.href = '/success';
          // You can also add more actions here, e.g., updating the order status in your database
        },
        // prefill: {
        //   name: 'Fabsurat',
        //   email: 'fabsurat@gmail.com',
        //   contact: '0000000000'
        // }
      };
  
      // Display the Razorpay payment window
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error processing Razorpay payment:", error);
      alert("An error occurred while processing the payment. Please try again.");
    }
  }
  