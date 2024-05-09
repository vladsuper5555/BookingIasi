import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/main-page-style.css";
import photoIasi from "./assets/svg/photo-attractions-iasi.png";
import "./styles/custom-variables.css";

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

  // Function to chunk array into smaller arrays
  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  return (
    <div className="main-body-attractions">
      <div className="main-container-info-attractions">
        <div className="main-info-hotels-attr">
          <div className="header-container-attr">
            <div className="line-attr"> </div>
            <h3 className="header-title-attr">Iasi</h3>
            <div className="line-attr"> </div>
          </div>
          <div className="hotels-title-container">
            <h1 className="hotels-title-attr">HOTELS</h1>
          </div>
          <div className="description-hotel-attr">
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>
          </div>
        </div>
        <div>
          <img
            src={photoIasi}
            alt="palace of culture iasi"
            className="main-photo-attr"
          />
        </div>
      </div>
      <div className="grid-container">
        {error && <p>{error}</p>}
        {hotelNames.length > 0 && (
          <div className="grid">
            {chunkArray(hotelNames, 4).map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((name, colIndex) => (
                  <div key={colIndex} className="col">
                    <button
                      onClick={() => fetchAttractionsForHotel(name)}
                      className="button-to-attractions"
                    >
                      {name}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttractionsPage;
