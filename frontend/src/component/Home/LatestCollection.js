import React, { useState, useEffect, useCallback } from 'react';
import './LatestCollection.css';
import { Link } from "react-router-dom";

import LatestCollectionImage1 from '../../images/box10.jpg';
import LatestCollectionImage2 from '../../images/box11.jpg';
import LatestCollectionImage3 from '../../images/box8.jpg';
import LatestCollectionImage4 from '../../images/box14.jpg';
import LatestCollectionImage5 from '../../images/box6.jpg';
import LatestCollectionImage6 from '../../images/box7.jpg';
import LatestCollectionImage7 from '../../images/box8.jpg';
import LatestCollectionImage8 from '../../images/box18.jpg';
import LatestCollectionImage9 from '../../images/box19.jpg';
import LatestCollectionImage10 from '../../images/box20.jpg';

const LatestCollection = () => {
  const [currentLatestSlide, setCurrentLatestSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const latestSlides = [
    { image: LatestCollectionImage1, alt: 'Latest 1', name: 'FABRICS' },
    { image: LatestCollectionImage8, alt: 'Latest 8', name: 'FAB1' },
    { image: LatestCollectionImage9, alt: 'Latest 9', name: 'FAB2' },
    { image: LatestCollectionImage10, alt: 'Latest 10', name: 'FAB3' },
    { image: LatestCollectionImage2, alt: 'Latest 2', name: 'READYMADES' },
    { image: LatestCollectionImage3, alt: 'Latest 3', name: 'COTTON FABRICS' },
    { image: LatestCollectionImage4, alt: 'Latest 4', name: 'EMBROIDERED' },
    { image: LatestCollectionImage5, alt: 'Latest 5', name: 'SILK' },
    { image: LatestCollectionImage6, alt: 'Latest 6', name: 'KURTI-SET' },
    { image: LatestCollectionImage7, alt: 'Latest 7', name: 'CO-ORD SET' },
  ];

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
      <h2 className="latest-collection-heading">Your everyday luxury, That lasts forever</h2>
      <div className="latest-collection-container">
        <button className="latest-slide-nav prev" onClick={prevLatestSlide} disabled={isSliding}>
          &#10094;
        </button>
        <div className={`latest-slide-show ${isSliding ? 'sliding' : ''}`}>
          {getVisibleSlides().map((slide, index) => (
            <div className="latest-slide" key={index}>
              <Link to = "/products">
              <img src={slide.image} alt={slide.alt} />
              </Link>
              <p className="latest-slide-name">{slide.name}</p>
            </div>
          ))}
        </div>
        <button className="latest-slide-nav next" onClick={nextLatestSlide} disabled={isSliding}>
          &#10095;
        </button>
      </div>
    </>
  );
};

export default LatestCollection;
