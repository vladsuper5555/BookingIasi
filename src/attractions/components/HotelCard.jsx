import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hotelCardStyle from "../styles/hotel-card-style.module.css";
import arrowFor from "../assets/svg/arrow-forward.svg";

const HotelCard = ({ hotelName, hotelDescription, hotelPhoto }) => {
  const [hotelNames, setHotelNames] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchAttractionsForHotel = async (hotelName) => {
    try {
      const response = await fetch(
        "http://localhost:5173/api/attractionshotel",
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
        navigate(`/attractions/${hotelName}`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
    }
  };

  return (
    <div className={hotelCardStyle["container-hotel-card"]}>
      <div className={hotelCardStyle["image-hotel-container"]}>
        <img src={hotelPhoto} alt="photo of hotel ${hotelName}" 
        className={hotelCardStyle["image-hotel"]}/>
      </div>
      <div className={hotelCardStyle["info-hotel-container"]}>
        <div>
          <h2 className={hotelCardStyle["hotel-card-name"]}>{hotelName}</h2>
          <p className={hotelCardStyle["hotel-card-description"]}>{hotelDescription}</p>
        </div>
        <div>
          <button onClick={() => fetchAttractionsForHotel(hotelName)}
          className={hotelCardStyle["hotel-to-attractions"]}>
            Details <span className={hotelCardStyle["hotel-arrow-button"]}><img src={arrowFor} alt="arrow" /></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
