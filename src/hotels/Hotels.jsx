// MainPage.jsx
import React from 'react';
import { Link, redirect } from 'react-router-dom';
import { useState } from 'react'
import Button from '@mui/material/Button';
import Mesaj from './Mesaj';
//import mainPhoto from ".images/";//update dupa ce se aleg pozele
import "./styles/main-page.css";

const Hotels = () => {
  return (
  <div className='general-stucture'>   
    {/* <div>
      <h1>Unirea Hotel & Spa</h1> 
      <Mesaj/>
      <h3>Hotel</h3>
    </div> */}
    
      <div className="hotels">
        <header className="header">
          <h1>Unirea Hotel & Spa</h1>
          <div className="header-image">
            <img src="path-to-hotel-image.jpg" alt="Unirea Hotel & Spa" />
            <div className="header-info">
              <p>Check-in: 14:00 PM</p>
              <p>Check-out: 12:00 PM</p>
              <p>Opening hours: 07:00 AM</p>
              <p>Price: €€€€</p>
            </div>
          </div>
        </header>
      
        <section className="about">
          <h2>About</h2>
          <p>
            Unirea Hotel & Spa is located in Piata Unirii, in the center of Iași, a few steps from 
            Alexandru Ioan Cuza University, and offers free access to an indoor pool, a hot tub 
            and a fitness center. Copou Park, where Eminescu's lime tree is located, is a 10-minute walk away.
          </p>
          <img src="path-to-about-image.jpg" alt="About Unirea Hotel" />
        </section>
      
        <section className="features">
          <h2>Features</h2>
          <div className="feature-images">
            <img src="path-to-feature1.jpg" alt="Feature 1" />
            <img src="path-to-feature2.jpg" alt="Feature 2" />
            <img src="path-to-feature3.jpg" alt="Feature 3" />
          </div>
          <p>
            The elegant rooms at Unirea Hotel & Spa are equipped with a flat-screen TV with 
            international channels, free access to WiFi, bathrobes and slippers are available.
          </p>
          <ul>
            <li>No pets allowed</li>
            <li>Parking lot available</li>
            <li>Smoking is not allowed</li>
            <li>Planning events</li>
          </ul>
        </section>
      
        <section className="reviews">
          <h2>Reviews</h2>
          <p>Overall rating: 4.7 ★</p>
          <blockquote>
            <p>Everything perfect! Very rich, diversified breakfast! Swimming pool with hot water and jacuzzi! Polite staff. Grade 10! Our expectations were exceeded! Free parking!</p>
          </blockquote>
        </section>
      
        <section className="contact">
          <h2>Contact Us</h2>
          <p>
            Discover the pleasure of a perfect stay in a hotel located right in the heart of Iași.
          </p>
          <address>
            Piata Unirii 5, Iași 700056<br />
            <a href="mailto:rezervari@hotelunirea.ro">rezervari@hotelunirea.ro</a><br />
            +40-232-205000<br />
            Cash and card accepted
          </address>
        </section>
      </div>
    </div>
  );
}

export default Hotels;
