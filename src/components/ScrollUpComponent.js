import React, { useState, useEffect } from 'react';
import "../styles/scroll.css";

const ScrollUpComponent = ({}) => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
        setShowButton(false); // Hide the button after reaching top
        scrollToElement("h1"); // Scroll to the element with ID "h1"
      }
    }, 15);
  };

  const handleScroll = () => {
    setShowButton(window.scrollY > 100);
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`scroll-button ${showButton ? 'show' : ''}`}
      onClick={()=>scrollToTop}
    >
      ↑
    </button>
  );
}

export default ScrollUpComponent;