"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import BuySell from '@/components/BuySell';
import FeatureSlider from '@/components/FeatureSlider';
import ArticleSection from '@/components/ArticleSection';
import PetCare from '@/components/PetCare';
import NGOFinder from '@/components/NGOFinder';
import Footer from '@/components/Footer';
import EmailSection from '@/components/Feedback';
import DangerousFood from '@/components/DangerousFood';

const Home = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-gray-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-600 transition-all duration-300 z-50"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
      
      <BuySell />
      <FeatureSlider />
      <NGOFinder />
      <PetCare />
      <ArticleSection />
      <DangerousFood />
      <EmailSection />
      <Footer />
    </div>
  );
};

export default Home;
