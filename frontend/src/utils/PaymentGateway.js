export default async function displayRazorpay() {
    //simple post the node.js server
    
        
    const data = await fetch("http://localhost:4000/razorpay", {
        method: 'POST',
    }).then((t) => t.json())
    console.log(data)

    //options

    const options = {
        key: "rzp_live_dhzrrUe3u21D7B",
        currency: data.currency,
        amount: data.amount,
        description: 'Wallet Transaction',
        image: 'http://localhost:4000/logo.png',
        order_id : data.id,
        handler: function() {
            window.location.href = '/success';
            // alert("PAYMENT ID: " + response.razorpay_payment_id)
            // alert("ORDER ID: " + response.razorpay_order_id)
        },
        // prefill: {
        //     //fill out the details
        //     name: 'Fabsurat',
        //     email: 'fabsurat@gmail.com',
        //     contact: '0000000000'
        // }
    };

    // display the window on button click

    const paymentObject = new window.Razorpay(options)

    paymentObject.open()
}
