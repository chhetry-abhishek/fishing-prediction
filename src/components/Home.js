import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom'; 
import './Home.css';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <div className="home-container">
        <div className="box content-section">
          <div className="text-content">
            <h1>Welcome to Fishing Prediction App</h1>
            <p>Discover the best fishing conditions and plan your next fishing trip with our app. Get real-time weather updates, fishing predictions, and more!</p>
            <p>With our easy-to-use interface, you can input your location, check the current weather, and get tailored advice on the best times and places to fish.</p>
            <p>Join our community of fishing enthusiasts and make every fishing trip a successful one. Whether you are a novice or an experienced angler, our app provides valuable insights to enhance your fishing experience.</p>
          </div>
          <div className="image-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdNjDufAe4_-SkGaD3QI3az6pHy1bSsTwYlQ&s" alt="Fishing Welcome" />
          </div>
        </div>
        <div className="box content-section">
          <div className="image-container">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVAEeW6dt87bMZYDTQzqNuzK6yFY4vaJlTfQ&s" alt="Fishing Tips" />
          </div>
          <div className="text-content">
            <h2>Fishing Tips and Tricks</h2>
            <p>Learn from experts about the best fishing techniques, gear recommendations, and seasonal tips. Our comprehensive guide covers everything from bait selection to the latest fishing trends.</p>
            <p>Explore our blog for in-depth articles, tutorials, and videos that will help you refine your skills and increase your chances of catching more fish.</p>
            <p>Stay updated with the latest fishing news and innovations to stay ahead of the game. Our app is your ultimate resource for becoming a better angler.</p>
          </div>
        </div>

        <div className="box feature-section">
          <div className="text-content">
            <h2>Explore More Features</h2>
            <p>Our app is packed with additional features to enhance your fishing experience. From detailed weather forecasts to community forums where you can share your fishing stories, we have something for everyone.</p>
            <p>Check out our interactive maps that highlight popular fishing spots and read reviews from other anglers. Stay connected and never miss out on the best fishing opportunities.</p>
            <p>Whether you are looking for new fishing spots or simply want to improve your skills, our app provides all the tools and resources you need to make the most out of every fishing trip.</p>
          </div>
          <div className="text-content">
            <h2>Explore More Features</h2>
            <p>Our app is packed with additional features to enhance your fishing experience. From detailed weather forecasts to community forums where you can share your fishing stories, we have something for everyone.</p>
            <p>Check out our interactive maps that highlight popular fishing spots and read reviews from other anglers. Stay connected and never miss out on the best fishing opportunities.</p>
            <p>Whether you are looking for new fishing spots or simply want to improve your skills, our app provides all the tools and resources you need to make the most out of every fishing trip.</p>
          </div>
        </div>
        {/* <div className="button-section">
          <Link to="/login" className="action-button">See Fishing Conditions</Link>
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
