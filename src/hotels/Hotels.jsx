// MainPage.jsx
import React from 'react';
import { Link, redirect } from 'react-router-dom';
import { useState } from 'react'
import Button from '@mui/material/Button';
import Mesaj from './Mesaj';
import PrincipalImage from "./images/hotels/UnireaHotelSpa/principal.jpg";
import Principal2 from "./images/hotels/UnireaHotelSpa/principal2.jpg";
import ContactImage from "./images/hotels/UnireaHotelSpa/iasi.jpg";
import Feature1 from "./images/hotels/UnireaHotelSpa/event rooms/restaurant1.jpg";
import Feature2 from "./images/hotels/UnireaHotelSpa/pool or spa/pool.jpg";
import Feature3 from "./images/hotels/UnireaHotelSpa/apartments/app_id_1/rooms/room1/room1.jpg";
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
          <div className='subtitle'>
          <div className="horizontal-line"></div> Hotel <div className="horizontal-line"></div>
          </div>
          <div className="header-image">
            <img src={PrincipalImage} alt="Unirea Hotel & Spa" />
          <div className="header-info">
              <div className="sectiuneInfo">
              <p><div className="inBold">Check-in:</div> 14:00 PM</p>
              <p><div className="inBold">Check-out:</div> 12:00 PM</p>
              </div>
              <div className='vertical-line'></div>
              <div className="sectiuneInfo">
              <p><div className="inBold">Opening hours:</div> 07:00 AM</p>
              </div>
              <div className='vertical-line'></div>
              <div className="sectiuneInfo">
              <p><div className="inBold">Price:</div> €€€€</p>
           </div>
           </div>
          </div>
        </header>
      
        <section className="about">
          <div className="titluSectiune">About</div>
          <div className="continut">
          <div className="sectiuneText">
            Unirea Hotel & Spa is located in Piata Unirii, in the center of Iași, a few steps from 
            Alexandru Ioan Cuza University, and offers free access to an indoor pool, a hot tub 
            and a fitness center. Copou Park, where Eminescu's lime tree is located, is a 10-minute walk away.
          </div>
          <div className="sectiuneImagine">
          <img src={Principal2} alt="Unirea Hotel & Spa - about" />
          </div>
          </div>
        </section>
      
        <section className="features">
        <div className="titluSectiune">Features</div>
          <div className="feature-images">
            <img src={Feature1} alt="Feature 1" />
            <img src={Feature2} alt="Feature 2" />
            <img src={Feature3} alt="Feature 3" />
          </div>
          <div className="continut">
          <div className="sectiuneText">
            <div className="oneUnderAnother">
            The elegant rooms at Unirea Hotel & Spa are equipped with a flat-screen TV with 
            international channels, free access to WiFi, bathrobes and slippers are available.

            <a href="http://localhost:5173/Hotels">Click to see the hotel rooms 3D!</a>
            <a href="http://localhost:5173/Hotels">Click to see attractions around!</a>
            </div>
            </div>
          <div className="featuresBox">
            <div>No pets allowed</div>
            <div>Parking lot available</div>
            <div>Smoking is not allowed</div>
            <div>Planning events</div>
            </div>
          </div>
        </section>
      
        <section className="reviews">
        <div className="upperSection">
         <div className="titluSectiune">Reviews</div>
         <div className="overallRating">Overall rating: 4.7 ★</div>
         </div>
          <blockquote>
            <div className="recenzie">Everything perfect! Very rich, diversified breakfast! Swimming pool with hot water and jacuzzi! Polite staff. Grade 10! Our expectations were exceeded! Free parking!</div>
          </blockquote>
        </section>
      
        <section className="contact">
          <img src={ContactImage} alt="imagine din interior"></img>
          <div className="contactBox">
        <div className="titluSectiune">Contact Us</div>
          <p>
            Discover the pleasure of a perfect stay in a hotel located right in the heart of Iași.
          </p>
          <address>
            Piata Unirii 5, Iași 700056<br />
            <a href="mailto:rezervari@hotelunirea.ro">rezervari@hotelunirea.ro</a><br />
            +40-232-205000<br />
            Cash and card accepted
          </address>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Hotels;
