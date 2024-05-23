import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/main-page-style.module.css";
import photoIasi from "./assets/svg/photo-attractions-iasi.png";
import "./styles/custom-variables.css";
import HotelCard from "./components/HotelCard";

import hotelData from "./utils/hotelData";
import { Hotel } from "@mui/icons-material";

const AttractionsPage = () => {
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

  const fetchAndGenerateHotelButtons = async () => {
    try {
      const response = await fetch("http://localhost:5173/api/attractions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setHotelNames(data.hotelNames);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
    }
  };

  useEffect(() => {
    fetchAndGenerateHotelButtons();
  }, []);

  return (
    <div className={styles["main-body-attractions"]}>
      <div className={styles["main-container-info-attractions"]}>
        <div className={styles["main-info-hotels-attr"]}>
          <div className={styles["header-container-attr"]}>
            <div className={styles["line-attr"]}></div>
            <h3 className={styles["header-title-attr"]}>Iasi</h3>
            <div className={styles["line-attr"]}></div>
          </div>
          <div className={styles["hotels-title-container"]}>
            <h1 className={styles["hotels-title-attr"]}>HOTELS</h1>
          </div>
          <div className={styles["description-hotel-attr"]}>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nasc
              ur ridiculus mus.
            </p>
          </div>
        </div>
        <div>
          <img
            src={photoIasi}
            alt="palace of culture iasi"
            className={styles["main-photo-attr"]}
          />
        </div>
      </div>
      <div className={styles["grid-container"]}>
        {error && <p>{error}</p>}
        {hotelNames.length > 0 && (
          <div className={styles["grid"]}>
            {hotelNames.map((name, index) => (
              <div key={index} className={styles["row"]}>
                <div className={styles["col"]}>
                  <HotelCard 
                    hotelName={name}
                    hotelDescription={hotelData[index].description}
                    hotelPhoto={hotelData[index].image}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttractionsPage;