import React from 'react';
import './Comingsoon.css'; 

const handleOrderNowClicks = () => {
    const phoneNumber = "918013267616"; // WhatsApp number in international format
    const message = "Hello, I'm interested in placing a bulk order for Fabrics/Readymades"; // Optional pre-filled message
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    // Open WhatsApp chat in a new tab
    window.open(whatsappURL, '_blank');
  };

const Comingsoon = () => {
  return (
    <>
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1>Coming Soon</h1>
        <p>Stay tuned for exciting updates!</p>
      </div>
    </div>
     <div className="bulk-orders-section">
     <h2>We take <span className="highlight">Bulk Orders</span> too!</h2>
     <p>
       Looking for bulk fabric orders? Look no further! Our extensive selection features <strong>premium quality</strong> materials, including luxurious silks, durable cottons, versatile blends, and more, all designed to elevate your creations. Whether you're crafting elegant evening wear, comfortable everyday outfits, or bespoke home decor, we have the perfect fabric to bring your vision to life. Enjoy exceptional customer service, fast shipping, and competitive prices that make it easy to get exactly what you need. Don't miss out on the opportunity to transform your projects with the best fabrics available—order now and experience the difference!
     </p>
     <p><strong>Order now</strong> and get the best fabric for your needs!</p>
     
     <button className="order-now-button" onClick={handleOrderNowClicks}>Order Now</button>
   </div>
   </>
  );
};

export default Comingsoon;
