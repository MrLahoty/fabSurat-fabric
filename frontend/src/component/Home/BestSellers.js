import React, { useState, useEffect, useCallback } from 'react';
import './BestSellers.css';
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

import LatestCollectionImage1 from '../../images/b1.jpeg';
import LatestCollectionImage2 from '../../images/b5.jpeg';
import LatestCollectionImage3 from '../../images/b6.jpeg';
import LatestCollectionImage4 from '../../images/b7.jpeg';
import LatestCollectionImage5 from '../../images/b8.jpeg';
import LatestCollectionImage8 from '../../images/b2.jpeg';
import LatestCollectionImage9 from '../../images/b3.jpeg';
import LatestCollectionImage10 from '../../images/b4.jpeg';

const BestSellers = () => {
  
  const [currentLatestSlide, setCurrentLatestSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const latestSlides = [
    { id: "6744790ce65e98a568966266", image: LatestCollectionImage1, alt: 'Latest 1', name: 'Red Position Print On Chinon Fabric', 
        originalPrice: "290.00",
        discountedPrice: "290.00",
        discount: "0" ,
        ratings: "5",
        numOfReviews: "1" },
    { id: "6707c723b3c98a75e8c5c988", image: LatestCollectionImage8, alt: 'Latest 8', name: 'Yellow Floral Position Print On Chinon Fabric', 
        originalPrice: '325.00',
        discountedPrice: '325.00',
        discount: '0' ,
        ratings: '4.5',  
        numOfReviews: '2' },
    { id:"66fa8a7a92a3d36fbf35e01e", image: LatestCollectionImage9, alt: 'Latest 9', name: 'Abstract Blue Position Print On Chinon Fabric', 
        originalPrice: '250.00',
        discountedPrice: '199.00',
        discount: '20' ,
        ratings: "4.5",  
        numOfReviews: "2" },
    { id: "67090ccb67b1f3c9d02d8fd9", image: LatestCollectionImage10, alt: 'Latest 10', name: 'Pichhwai Print With Crochet Work On Rayon Fabric',
        originalPrice: '180.00',
        discountedPrice: '180.00',
        discount: '0' ,
        ratings: "4",  
        numOfReviews: "1" },
    { id: "66f699323d598e3f6464b768", image: LatestCollectionImage2, alt: 'Latest 2', name: 'Lavender Floral Position Print On Pure Chinon/Chiffon' ,
        originalPrice: '570.00',
        discountedPrice: '450.00',
        discount: '21' ,
        ratings: "4.5" ,
        numOfReviews: "3" },
    { id: "67443cdbe9d358e06380350a", image: LatestCollectionImage3, alt: 'Latest 3', name: 'Blue Position Print On Organza Fabric' ,
        originalPrice: '295.00',
        discountedPrice: '295.00',
        discount: '0',
        ratings: "5" ,
        numOfReviews: "3" },
    { id: "6703c85a516ca6840fe6d0aa", image: LatestCollectionImage4, alt: 'Latest 4', name: 'Pink Cutwork Sequins Embroidered On Faux georgette Fabric' ,
        originalPrice: '619.00',
        discountedPrice: '495.00',
        discount: '20' ,
        ratings: "4" ,
        numOfReviews: "5" },
    { id: "6745b920d15a2f6adf1782a6", image: LatestCollectionImage5, alt: 'Latest 5', name: 'Dyeable Lucknawi Thread Work Mirror Embroidered Fabric' ,
        originalPrice: '300.00',
        discountedPrice: '300.00',
        discount: '0' ,
        ratings: "4.5" ,
        numOfReviews: "4" },
  ];

  const options = (rating) => ({
    value: rating,
    readOnly: true,
    precision: 0.5,
  });

  const slidesToShow = 4;

  const nextLatestSlide = useCallback(() => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setIsSliding(false);
        setCurrentLatestSlide((prevSlide) => (prevSlide + 1) % latestSlides.length);
      }, 600);
    }
  }, [latestSlides.length, isSliding]);

  const prevLatestSlide = useCallback(() => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setIsSliding(false);
        setCurrentLatestSlide((prevSlide) => (prevSlide - 1 + latestSlides.length) % latestSlides.length);
      }, 600);
    }
  }, [latestSlides.length, isSliding]);

  useEffect(() => {
    const interval = setInterval(nextLatestSlide, 2000);
    return () => clearInterval(interval);
  }, [nextLatestSlide]);

  const getVisibleSlides = () => {
    const visibleSlides = [];
    for (let i = 0; i < slidesToShow; i++) {
      const index = (currentLatestSlide + i) % latestSlides.length;
      visibleSlides.push(latestSlides[index]);
    }
    return visibleSlides;
  };

  return (
    <>
      <h2 className="best-collection-heading">All Time Best Seller</h2>
      <div className="best-collection-container">
        <button className="best-slide-nav prev" onClick={prevLatestSlide} disabled={isSliding}>
          &#10094;
        </button>
        <div className={`best-slide-show ${isSliding ? 'sliding' : ''}`}>
          {getVisibleSlides().map((latestSlides, index) => (
            <div className="best-slide" key={index}>
              <Link to={`/product/${latestSlides.id}`}> 
                <img src={latestSlides.image} alt={latestSlides.alt} />
              </Link>
              <p className="best-slide-name">{latestSlides.name}</p> 
              <p className="product-price">
                 <span className="original-price">
                ₹{latestSlides.originalPrice ? parseFloat(latestSlides.originalPrice).toFixed(2) : 'N/A'}
                 </span>
                <span className="discounted-price">
                 ₹{latestSlides.discountedPrice ? parseFloat(latestSlides.discountedPrice).toFixed(2) : 'N/A'}
                </span>
                <span className="discount">
                (-{latestSlides.discount ? latestSlides.discount : '0'}%)
                 </span>
              </p>

              <div className="ratingss">
                <Rating {...options(latestSlides.ratings)} />{" "}
                <span className="bestSellersratings">
                  {" "}
                  ({latestSlides.numOfReviews} Reviews)
                </span>
              </div>
     
            </div>
          ))}
        </div>
        <button className="best-slide-nav next" onClick={nextLatestSlide} disabled={isSliding}>
          &#10095;
        </button>
      </div>
    </>
  );
};

export default BestSellers;
