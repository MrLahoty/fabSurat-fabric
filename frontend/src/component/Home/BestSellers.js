import React, { useState, useEffect, useCallback } from 'react';
import './BestSellers.css';
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

import LatestCollectionImage1 from '../../images/box5.jpg';
import LatestCollectionImage2 from '../../images/box11.jpg';
import LatestCollectionImage3 from '../../images/box8.jpg';
import LatestCollectionImage4 from '../../images/box14.jpg';
import LatestCollectionImage5 from '../../images/box6.jpg';
import LatestCollectionImage6 from '../../images/box7.jpg';
import LatestCollectionImage7 from '../../images/box8.jpg';
import LatestCollectionImage8 from '../../images/box18.jpg';
import LatestCollectionImage9 from '../../images/box19.jpg';
import LatestCollectionImage10 from '../../images/box20.jpg';

const BestSellers = () => {
  
  const [currentLatestSlide, setCurrentLatestSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const latestSlides = [
    { id: "66f665f0b66fcbfff13ba494", image: LatestCollectionImage1, alt: 'Latest 1', name: 'Morpeach Plain Crushed Korean Velvet Fabric', 
        originalPrice: "385.00",
        discountedPrice: "290.00",
        discount: "25" ,
        ratings: "5",
        numOfReviews: "1" },
    { id: "661fc27ebacffa0ac73492f9", image: LatestCollectionImage8, alt: 'Latest 8', name: 'FAB1', 
        originalPrice: '229.00',
        discountedPrice: '206.1',
        discount: '10' ,
        ratings: '0',  
        numOfReviews: '0' },
    { id:"661fc3817b484217e77b5176", image: LatestCollectionImage9, alt: 'Latest 9', name: 'FAB2', 
        originalPrice: '145.00',
        discountedPrice: '134.85',
        discount: '7' ,
        ratings: "4.5",  
        numOfReviews: "2" },
    { id: "661fc4001e4226bc07a4805a", image: LatestCollectionImage10, alt: 'Latest 10', name: 'FAB3',
        originalPrice: '456.00',
        discountedPrice: '378.48',
        discount: '17' ,
        ratings: "4",  
        numOfReviews: "1" },
    { id: "661fc650cdd55940cf1e8ec3", image: LatestCollectionImage2, alt: 'Latest 2', name: 'READYMADES' ,
        originalPrice: '2491.00',
        discountedPrice: '1768.61',
        discount: '29' ,
        ratings: "3.5" ,
        numOfReviews: "2" },
    { id: "661fc71c0bc3eb7b9408d89f", image: LatestCollectionImage3, alt: 'Latest 3', name: 'COTTON FABRICS' ,
        originalPrice: '491.00',
        discountedPrice: '392.8',
        discount: '20',
        ratings: "5" ,
        numOfReviews: "2" },
    { id: "661fc80ea040cb5b8debc656", image: LatestCollectionImage4, alt: 'Latest 4', name: 'EMBROIDERED' ,
        originalPrice: '249.00',
        discountedPrice: '236.55',
        discount: '5' ,
        ratings: "4" ,
        numOfReviews: "5" },
    { id: "661fed3301b5cf7b14fc35ff", image: LatestCollectionImage5, alt: 'Latest 5', name: 'SILK' ,
        originalPrice: '543.00',
        discountedPrice: '477.84',
        discount: '12' ,
        ratings: "0" ,
        numOfReviews: "0" },
    { id: "661fedb9dc26c4b094560ffa", image: LatestCollectionImage6, alt: 'Latest 6', name: 'KURTI-SET',
        originalPrice: '481.00',
        discountedPrice: '418.47',
        discount: '13' ,
        ratings: "4.5" ,
        numOfReviews: "3" },
    { id: "661fedb9dc26c4b094560ffa", image: LatestCollectionImage7, alt: 'Latest 7', name: 'CO-ORD SET' ,
        originalPrice: '2491.00',
        discountedPrice: '1992.8',
        discount: '20' ,
        ratings: "3.5" ,
        numOfReviews: "2" },
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
