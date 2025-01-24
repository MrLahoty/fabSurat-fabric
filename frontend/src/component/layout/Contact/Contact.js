import React from "react";
import "./Contact.css";

const phoneNumber = "+917003798513";
const emailAddress = "officialfabsurat@gmail.com";
const addressUrl = "https://maps.app.goo.gl/qEM4PxPP3q62CjKD7";

const Contact = () => {
  return (
    <div className="contacts">
      <a href={`tel:${phoneNumber}`} className="contact-link">
        <p>
          <i className="fas fa-phone"></i> {phoneNumber}
        </p>
      </a>
      <a href={`mailto:${emailAddress}`} className="contact-link">
        <p>
          <i className="fas fa-envelope"></i> {emailAddress}
        </p>
      </a>
      <a href={addressUrl} target="_blank" rel="noopener noreferrer" className="contact-link">
        <p>
          <i className="fas fa-map-marker-alt"></i> Shop No. 1013-14, Block A, 1st Floor, Global Textile Market, Sahara Darwaja, Surat, Gujarat, 395002
        </p>
      </a>
    </div>
  );
};

export default Contact;
