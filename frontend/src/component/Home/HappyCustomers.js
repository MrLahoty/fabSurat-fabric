import React, { useEffect, useState, useMemo } from 'react';
import { Rating } from '@mui/material';
import './HappyCustomers.css'; 

// Import images
import product1 from '../../images/Karishma_XJRWO420A8_2025-04-26_1.webp';
import product2 from '../../images/Bhavna _QGJPGKNTHG_2025-04-26_1.webp';
import product3 from '../../images/Saba_55ZL1HXRVJ_2025-04-26_1.webp';
import product4 from '../../images/Anam_EF6QAS59MA_2025-04-26_1.webp';
import product5 from '../../images/Riya_33K092BEFW_2025-04-26_1.webp';
import product6 from '../../images/Madhuri_XGTFL00G49_2025-02-14_1.webp';
import product7 from '../../images/roshni_2XQG2I473Z_2025-02-14_1.webp';
import product8 from '../../images/anjali_AZI5J2UVAT_2025-02-14_1.webp';
import product9 from '../../images/riya_XXD2F3Q1LR_2025-02-14_1.webp';
import product10 from '../../images/priya_W8Q9ISFFEI_2025-02-14_1.webp';
import product11 from '../../images/Nisha       _Y7XGC4O9QZ_2024-12-24_1.webp';
import product12 from '../../images/Maya        _78RUIGWBYG_2024-12-24_1.webp';
import product13 from '../../images/Kiara        _P8DNOP7LDX_2024-12-24_1.webp';
import product14 from '../../images/Diya        _EFAP9227HD_2024-12-24_1.webp';
import product15 from '../../images/Aria         _ZE7M21S1RS_2024-12-24_1.webp';
import product16 from '../../images/Ananya   _TLBS8ZNM0U_2024-12-24_1.webp';
import product17 from '../../images/Aisha      _PITXLJMYU9_2024-12-24_1.webp';
import product18 from '../../images/Rubi_ED3GIXU3TC_2024-12-24_1.webp';
import product19 from '../../images/Radhika_4GP6V4WC8F_2024-12-24_1.webp';
import product20 from '../../images/Nirmala_5SY0XZ40XA_2024-12-24_1.webp';

const HappyCustomers = () => {
  const customers = useMemo(() => [
    {
      name: 'Karishma',
      image: product1,
      comment: 'It’s Clear that these Suits Are Designed With Real Women in Mind-People Who move,work, and live in them. The Tailoring is beautiful,but the fabric is what truly elevates them.Highly Recommend if you’re looking for suits that feel as good as they look!',
      rating: 5,
    },
    {
      name: 'Bhavna',
      image: product2,
      comment: 'I also recently bought a suit for the Summer Season, And It’s Just as amazing in its own way.Light,airy,and effortlessly stylish perfect for warm Office Days.I appreciate that these fabrics are thoughtfully chosen for both Comfort and Sophistication',
      rating: 5,
    },
    {
      name: 'Saba',
      image: product3,
      comment: 'I’ve purchased several women’s suits over the years, but I’ve never been as impressed as I was with the fabric quality here. It kept its shape all day long and didn’t wrinkle, even after sitting through hours of meetings. I felt polished and confident from morning to evening.',
      rating: 5,
    },
    {
      name: 'Anam',
      image: product4,
      comment: 'Choosing the right fabric can elevate your entire look making you feel confident, comfortable, and powerful. After exploring and testing a range of materials, this review highlights the best-rated fabrics for women’s suits based on durability, comfort, elegance, and overall performance.',
      rating: 5,
    },
    {
      name: 'Ritika',
      image: product5,
      comment: 'A well-tailored suit is a wardrobe essential for every woman, whether it’s for commanding the boardroom, attending a formal event, or making a stylish everyday statement. While cut and color play important roles, it’s the fabric that truly defines a suit’s quality, comfort, and sophistication. ',
      rating: 5,
    },
    {
      name: 'Madhuri',
      image: product6,
      comment: 'I’ve always found that the best suit fabrics should strike a balance between structure and softness, and this one does just that. The fabric has enough body to hold a sharp silhouette while still feeling light and breathable on the skin.',
      rating: 5,
    },
    {
      name: 'Roshni',
      image: product7,
      comment: 'The first thing that stood out to me when I received my order was the weight and texture of the fabric. It’s rich and luxurious without being overly heavy, making it incredibly comfortable to wear.',
      rating: 5,
    },
    {
      name: 'Anjali',
      image: product8,
      comment: 'Whether you’re looking to create a sophisticated work wardrobe, a timeless formal look, or simply a suit that you can wear to various occasions, this fabric is a dream come true.',
      rating: 5,
    },
    {
      name: 'Riya',
      image: product9,
      comment: 'This material has completely exceeded my expectations in every way, and I am thrilled to share my thoughts on it.',
      rating: 5,
    },
    {
      name: 'Priya',
      image: product10,
      comment: 'As someone who has spent years searching for the perfect fabric for women’s suits, I can confidently say that I have finally found my go-to fabric.',
      rating: 5,
    },
    {
      name: 'Nisha',
      image: product11,
      comment: 'I was a bit hesitant to try the FabSurat Fabric Material at first, but I’m so glad I did! The fabric is premium quality, with a rich texture and smooth finish. I used it to make a kurti, and it turned out exactly as I envisioned. The color didn’t fade after washing, and it’s held up well over time. Definitely worth the price',
      rating: 5,
    },
    {
      name: 'Maya',
      image: product12,
      comment: 'The FabSurat Fabric Material is stunning! The texture is soft, and the fabric has a slight sheen that gives it a touch of elegance. I used it for both a dress and a scarf, and both turned out beautifully. It’s a must-have for anyone who enjoys working with quality fabric',
      rating: 5,
    },
    {
      name: 'Kiara',
      image: product13,
      comment: 'As someone who loves to sew, I was looking for a high-quality fabric for a new project, and FabSurat Fabric Material did not disappoint! It’s very easy to cut and sew, and the finish is smooth and neat. The fabric has a nice flow, which makes it perfect for creating garments such as skirts and blouses.',
      rating: 5,
    },
    {
      name: 'Diya',
      image: product14,
      comment: 'I’m really impressed by the FabSurat Fabric Material. The fabric is soft to the touch yet feels strong and durable. I used it to make a set of curtains, and the fabric held its shape well, even after a few washes. I highly recommend it for anyone looking to create home décor or custom clothing',
      rating: 5,
    },
    {
      name: 'Aria',
      image: product15,
      comment: 'I ordered the FabSurat Fabric Material for a wedding outfit, and I couldn’t be happier with my purchase! The fabric has a beautiful sheen, making it perfect for special occasions. Will definitely be buying more for future projects',
      rating: 5,
    },
    {
      name: 'Ananya',
      image: product16,
      comment: 'The FabSurat Fabric Material is perfect for creating custom outfits. The material is soft to the touch, making it comfortable to wear all day long. I used it to make a dress, and the fabric drapes beautifully. I highly recommend this fabric for anyone looking to make their own unique clothing pieces',
      rating: 5,
    },
    {
      name: 'Aisha',
      image: product17,
      comment: 'I recently purchased FabSurat Fabric Material, and I’m thoroughly impressed by the quality. The texture is smooth, and the colors are vibrant and rich. Whether for casual or formal wear, this fabric is versatile and works beautifully for any design.',
      rating: 5,
    },
    {
      name: 'Rubi',
      image: product18,
      comment: 'I bought FabSurat Fabric Material to make a custom outfit for a wedding, and it turned out beautifully! The fabric has an elegant, shiny finish, which gives it a luxurious look without being too flashy. I will definitely use this for future wedding attire projects',
      rating: 5,
    },
    {
      name: 'Radhika',
      image: product19,
      comment: 'I ordered FabSurat Fabric Material to make a saree and dupatta set, and I’m absolutely in love with it! The feel of the fabric is luxurious, and it drapes beautifully. If you’re looking for fabric for traditional outfits, this one is perfect!',
      rating: 5,
    },
    {
      name: 'Nirmala',
      image: product20,
      comment: 'I used FabSurat Fabric Material for a few home décor projects, and it was fantastic! The fabric is soft but durable, making it perfect for things like cushion covers, bedspreads, and curtains. Highly recommend it for anyone looking to update their home with custom-made décor',
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
