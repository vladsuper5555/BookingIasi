// MainPage.jsx
import React from 'react';
import { Link, redirect } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Mesaj from './Mesaj';
import PrincipalImageUnirea from "./images/hotels/UnireaHotelSpa/principal.jpg";
import PrincipalImagePrestige from "./images/hotels/ApartamentHotelPrestige/principal.jpg";
import Principal2Unirea from "./images/hotels/UnireaHotelSpa/principal2.jpg";
import Principal2Prestige from "./images/hotels/ApartamentHotelPrestige/principal.jpg"
import ContactImageUnirea from "./images/hotels/UnireaHotelSpa/iasi.jpg";
import Feature1Unirea from "./images/hotels/UnireaHotelSpa/event rooms/restaurant1.jpg";
import Feature2Unirea from "./images/hotels/UnireaHotelSpa/pool or spa/pool.jpg";
import Feature3Unirea from "./images/hotels/UnireaHotelSpa/apartments/app_id_1/rooms/room1/room1.jpg";
import Feature1Prestige from "./images/hotels/ApartamentHotelPrestige/apartments/app_id_1/rooms/room1/dormitor.jpg";
import Feature2Prestige from "./images/hotels/ApartamentHotelPrestige/Kitchen/bucatarie.jpg";
import Feature3Prestige from "./images/hotels/ApartamentHotelPrestige/apartments/app_id_2/bathroom/baie.jpg";
import No_parking from "./images/Icons/features/no_parking_lot.svg";
import Parking from "./images/Icons/features/parking_lot.svg";
import No_pets from "./images/Icons/features/no_pets.svg";
import Pets from "./images/Icons/features/pets.svg";
import No_smoking from "./images/Icons/features/no_smoking.svg";
import Smoking from "./images/Icons/features/smoking.svg";
import event_allowed from "./images/Icons/features/events.svg";
import contact_cash_or_card from "./images/Icons/contact/cash_or_card.svg";
import contact_email from "./images/Icons/contact/email.svg";
import contact_location from "./images/Icons/contact/location.svg";
import contact_telephone from "./images/Icons/contact/telephone.svg";
import "./styles/main-page.css";
const Hotels = ({ name, checkinTime, checkoutTime, openingHours, priceRange, description, petsAllowed,
  parkingFacility, smokingAllowed, event, review, aggregateRating, address, email,
  telephone, paymentAccepted, currenciesAccepted, amenityFeature }) => {

  const [hotelData, setHotelData] = useState([]);
  const [error, setError] = useState('');
  
  const hotelName = 'Unirea Hotel & Spa';

  const fetchInfoForHotel = async () => {
    try {
      const response = await fetch(
        "/api/hotelsinfo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hotelName }),
        }
      );
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setHotelData(data.info[0]);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
    }
  };
  useEffect(() => {
    if (hotelName) {
      fetchInfoForHotel(hotelName);
    }
  }, []);
  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <div className='general-stucture'>   
      <nav className="navbar">
        <a href="#section_About">About</a>
        <a href="#section_Features">Features</a>
        <a href="#section_Review">Reviews</a>
        <a href="#section_Contact">Contact</a>
      </nav>   
      <div className="hotels">
        <header className="header">
          <h1>{hotelData?.name}</h1>
          <div className='subtitle'>
             <div className="horizontal-line"></div>
             <div className="subtitle-text">Hotel</div>
             <div className="horizontal-line"></div>
          </div>
          <div className="header-image">
            {hotelData?.name === 'Unirea Hotel & Spa' ? (
              <img src={PrincipalImageUnirea} alt="Unirea Hotel & Spa" />
            ) : (
              <img src={PrincipalImagePrestige} alt="Prestige Hotel" />
            )}
            <div className="header-info">
              <div className="sectiuneInfo">
                <p><span className="inBold">Check-in:</span> {hotelData?.checkinTime}PM</p>
                <p><span className="inBold">Check-out:</span> {hotelData?.checkoutTime}PM</p>
              </div>
              <div className='vertical-line'></div>
              <div className="sectiuneInfo">
                <p><span className="inBold">Opening hours:</span> {hotelData?.openingHours}</p>
              </div>
              <div className='vertical-line'></div>
              <div className="sectiuneInfo">
                <p><span className="inBold">Price:  </span>{hotelData?.priceRange}€      </p>
              </div>
            </div>
          </div>
        </header>
        <section id="section_About" className="about">
        <div className='subtitle'>
             <div className="horizontal-line"></div>
             <div className="subtitle-text">     </div>
             <div className="horizontal-line"></div>
          </div>
          <div className="titluSectiune1">About</div>
          <div className="continut">
            
            <div className="sectiuneText">
              {hotelData?.description}
            </div>
            <div className="sectiuneImagine">
            {hotelData?.name === 'Unirea Hotel & Spa' ? (
              <img src={Principal2Unirea} alt="Unirea Hotel & Spa" />
            ) : (
              <img src={Principal2Prestige} alt="Prestige Hotel" />
            )}
            </div>
          </div>
        </section>
        <section id="section_Features" className="features">
        <div className='subtitle'>
             <div className="horizontal-line"></div>
             <div className="subtitle-text">    </div>
             <div className="horizontal-line"></div>
          </div>
          <div className="titluSectiune">Features</div>
          <div className="feature-images">
            {hotelData?.name === 'Unirea Hotel & Spa' ? (
              <img src={Feature1Unirea} alt="Unirea Hotel & Spa" />
            ) : (
              <img src={Feature1Prestige} alt="Prestige Hotel" />
            )}
            {hotelData?.name === 'Unirea Hotel & Spa' ? (
              <img src={Feature2Unirea} alt="Unirea Hotel & Spa" />
            ) : (
              <img src={Feature2Prestige} alt="Prestige Hotel" />
            )}
            {hotelData?.name === 'Unirea Hotel & Spa' ? (
              <img src={Feature3Unirea} alt="Unirea Hotel & Spa" />
            ) : (
              <img src={Feature3Prestige} alt="Prestige Hotel" />
            )}
          </div>
          <div className="continut">
            <div className="sectiuneText">
              <div className="oneUnderAnother">
                {hotelData?.amenityFeature}
                <a href="/Hotels">Click to see the hotel rooms 3D!</a>
                <a href="/Hotels">Click to see attractions around!</a>
              </div>
            </div>
            <div className="featuresBox">
              <div>
                {hotelData?.petsAllowed ?
                  (<>
                    <img src={Pets} alt="image" className='smallerSize' />
                    Pets allowed
                  </>
                  ) : (
                    <>
                      <img src={No_pets} alt="image" className='smallerSize' />
                      No pets allowed
                    </>
                  )}
              </div>
              <div>
                {hotelData?.parkingFacility ? (
                  <>
                    <img src={Parking} alt="parking allowed" className='smallerSize' />
                    Parking lot available
                  </>
                ) : (
                  <>
                    <img src={No_parking} alt="no parking" className='smallerSize' />
                    Parking lot not available
                  </>
                )}
              </div>
              <div>
                {hotelData?.smokingAllowed ? (
                  <>
                  <img src={Smoking} alt="image" className='smallerSize' />
                  Smoking is allowed
                  </>
                  )
                  : (
                    <>
                    <img src={No_smoking} alt="image" className='smallerSize' />
                    Smoking is not allowed
                    </>
                  )}
              </div>
              <div>
              <>
                <img src={event_allowed} alt="image" className='smallerSize' />
                Events allowed
              </>
              </div>
            </div>
          </div>
        </section>
        <section id="section_Review" className="reviews">
        <div className='subtitle'>
             <div className="horizontal-line"></div>
             <div className="subtitle-text">     </div>
             <div className="horizontal-line"></div>
          </div>
          <div className="upperSection">
            <div className="titluSectiune">Reviews</div>
            <div className="overallRating">Overall rating: {hotelData?.aggregateRating} ★</div>
          </div>
          <blockquote>
            <div className="recenzie">{hotelData?.review}</div>
          </blockquote>
        </section>
        
        <section id="section_Contact" className="contact">
  <div className='subtitle'>
    <div className="horizontal-line"></div>
    <div className="subtitle-text"></div>
    <div className="horizontal-line"></div>
  </div>
  <div className="contact-image-container">
    <img src={ContactImageUnirea} alt="imagine din interior" className="contact-image" />
    <div className="contactBox">
      <div className="titluSectiune">Contact Us</div>
      <p>Discover the pleasure of a perfect stay in a hotel located right in the heart of Iași.</p>
      <address className="addressBox">
        <div>
          <img src={contact_location} alt="image" className='smallerSize' />{hotelData?.address}
        </div>
        <div>
          <img src={contact_email} alt="image" className='smallerSize' />{hotelData?.email}
        </div>
        <div>
          <img src={contact_telephone} alt="image" className='smallerSize' />{hotelData?.telephone}
        </div>
        <div>
          <img src={contact_cash_or_card} alt="image" className='smallerSize' />Currency accepted: {hotelData?.currenciesAccepted}
        </div>
      </address>
    </div>
  </div>
</section>



      </div>
    </div>
  );
}
export default Hotels;