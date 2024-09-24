import React, { useEffect, useState, useMemo } from 'react';
import { Rating } from '@mui/material'; // Import Rating from Material-UI
import './HappyCustomers.css'; 

// Import images
import product1 from '../../images/box5.jpg';
import product2 from '../../images/box11.jpg';
import product3 from '../../images/box8.jpg';
import product4 from '../../images/box14.jpg';
import product5 from '../../images/box6.jpg';
import product6 from '../../images/box19.jpg';

const HappyCustomers = () => {
  const customers = useMemo(() => [
    {
      name: 'Jyoti Sharma',
      image: product1,
      comment: 'I absolutely love this fabric! It’s perfect for my projects. The texture is so soft and the colors are vibrant. I have received many compliments on the items I made from it!',
      rating: 5,
    },
    {
      name: 'Janvi Tiwari',
      image: product2,
      comment: 'Great quality and fast shipping! The fabric is durable and easy to work with. I used it to make a dress, and it turned out beautifully. Highly recommended for anyone who loves sewing!',
      rating: 5,
    },
    {
      name: 'Sangeeta Borah',
      image: product3,
      comment: 'This fabric exceeded my expectations! It drapes wonderfully and feels luxurious against the skin. I used it for a quilt, and it adds a lovely touch to my home decor.',
      rating: 5,
    },
    {
      name: 'Prena Kohli',
      image: product4,
      comment: 'I keep coming back for more. Highly recommended! The variety of prints and patterns available is incredible. This fabric has inspired so many creative projects for me!',
      rating: 5,
    },
    {
      name: 'Divya Singh',
      image: product5,
      comment: 'Beautiful colors and great texture. I made several accessories with this fabric, and they turned out stunning! It’s my go-to fabric for all my craft projects now.',
      rating: 5,
    },
    {
      name: 'Shardha Agarwalla',
      image: product6,
      comment: 'Fantastic selection and great service! I appreciate the prompt delivery and the quality of the fabric. Each piece I ordered has been perfect for my needs, making sewing a joy!',
      rating: 5,
    },
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCustomers, setVisibleCustomers] = useState(customers.slice(0, 3));
  const [showMore, setShowMore] = useState(Array(customers.length).fill(false)); // Track "Show more" state for each customer

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % customers.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [customers.length]);

  useEffect(() => {
    const totalCustomers = customers.length;
    const newVisibleCustomers = [];

    for (let i = 0; i < 3; i++) {
      newVisibleCustomers.push(customers[(currentIndex + i) % totalCustomers]);
    }

    setVisibleCustomers(newVisibleCustomers);
  }, [currentIndex, customers]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleShowMoreClick = (index) => {
    const updatedShowMore = [...showMore];
    updatedShowMore[index] = !updatedShowMore[index]; // Toggle between show more and show less
    setShowMore(updatedShowMore);
  };

  return (
    <div className="happy-customers-section">
      <h2 className="happy-customers-heading">Happy Customers</h2>
      <div className="happy-customers-container">
        {visibleCustomers.map((customer, index) => (
          <div className="customer-box" key={index}>
            <div className="customer-info">
              <h3>{customer.name}</h3>
              <Rating name="customer-rating" value={customer.rating} readOnly className="customer-ratings" />
              <p className={`comment ${showMore[index] ? 'show-full' : 'show-less'}`}>
                {customer.comment}
              </p>
              <button onClick={() => handleShowMoreClick(index)} className="show-more-btn">
                {showMore[index] ? 'Show less' : 'Show more'}
              </button>
            </div>
            <img src={customer.image} alt={`Product by ${customer.name}`} />
            <p className="customer-text">Customer</p>
          </div>
        ))}
      </div>
      <div className="dots-container">
        {customers.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? 'active-dot' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HappyCustomers;
