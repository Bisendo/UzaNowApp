import React, { useState, useEffect } from "react";
import backgroundImage from "../images/image4.jpg"; // Adjust path as needed
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaArrowUp,
} from "react-icons/fa";

const HomePage = () => {
  const [showTopButton, setShowTopButton] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Show/hide the "Back to Top" button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative flex flex-col min-h-screen">
      {/* Top Logo/Title */}
      <div className="absolute top-4 left-6 z-10 text-3xl font-extrabold text-white drop-shadow-lg animate-fadeIn">
        <span className="px-3 py-1 rounded-md">UzaNow</span>
      </div>

      {/* Parallax Background Image Section */}
      <section
        className="relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPositionY: `${scrollY * 0.5}px`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide drop-shadow-md animate-slideIn">
            Welcome to <span className="text-white-500">UzaNow</span>
          </h1>
          <p className="mt-4 text-base md:text-lg font-black text-white drop-shadow-sm rounded p-2 animate-fadeInDelay">
            The ultimate platform to enhance your shopping experience.
          </p>
          <div className="mt-2 animate-fadeInDelay">
            <Link
              to="Login"
              className="bg-blue-500 hover:bg-blue-600 text-white text-base md:text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto text-center animate-fadeIn">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            At UzaNow, we aim to revolutionize the shopping experience with
            modern and user-friendly technology. Join us and explore the future
            of e-commerce.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Features</h2>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="w-full animate-fadeIn  sm:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeIn">
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your products delivered in record time with our efficient
                system.
              </p>
            </div>
            <div className="w-full sm:w-1/3 bg-gray-100 animate-fadeIn p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInDelay">
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Enjoy safe and reliable transactions with our secure payment
                gateway.
              </p>
            </div>
            <div className="w-full sm:w-1/3 bg-gray-100 p-6 animate-fadeIn rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-fadeInDelay2">
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our team is here to assist you anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-500 text-white py-8">
        <div className="text-center px-6">
          <p className="text-xs md:text-sm drop-shadow-sm">
            &copy; {new Date().getFullYear()} UzaNow. All rights reserved.
          </p>
          <p className="text-xs md:text-sm mt-2 drop-shadow-sm">
            Designed and developed by <span className="font-bold">Bidaus Bisendo</span>.
          </p>

          <div className="flex justify-center mt-6 space-x-4 animate-fadeIn">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200"
            >
              <FaTiktok size={24} />
            </a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all"
          aria-label="Back to top"
        >
          <FaArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default HomePage;
