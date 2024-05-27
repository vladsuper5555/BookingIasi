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
    if (isNavigating.current) return; 
    isNavigating.current = true;

    try {
      let hotelId;
      if (hotelName === "Unirea Hotel & Spa" || hotelName === "Prestige Hotel") {
        const response = await fetch("/api/attractionsbyid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ hotelName }),
        });

        if (!response.ok) {
            throw new Error("Response was not ok");
        }

        const data = await response.json();
        if (data.success) {
            hotelId = data.name;
            navigate(`/hotels/${hotelName}`, {replace: true});
        } else {
            setError(data.message);
        }
      } else {
        navigate(`/attractions/${hotelName}`, {replace: true});
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
    } finally {
      isNavigating.current = false; 
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
            Details <span><img src={arrowFor} alt="arrow" className={hotelCardStyle["hotel-arrow-button"]}/></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
