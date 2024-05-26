import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./styles/main-page-style.module.css";
import photoIasi from "./assets/svg/photo-attractions-iasi.png";
import "./styles/custom-variables.css";
import HotelCard from "./components/HotelCard";
import hotelData from "./utils/hotelData";
import personProfile from "./assets/svg/person-profile.svg";

const AttractionsPage = () => {
  const [hotelNames, setHotelNames] = useState([]);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isNavigating = useRef(false); 
  const isNavigatingProfile = useRef(false);

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

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredHotelNames = hotelNames.filter((name) =>
    name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleButtonsHotelClick = async (hotelName) => {
    if (isNavigating.current) return; 
    isNavigating.current = true;

    try {
      const response = await fetch("http://localhost:5173/api/attractionshotel", {
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
      console.log(data);
      if (data.success) {
        if (hotelName === "Hotel Unirea" || hotelName === "Apartament Hotel Prestige") {
          navigate(`/hotels`, { replace: true });
        } else {
          navigate(`/attractions/${hotelName}`, { replace: true });
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
    } finally {
      isNavigating.current = false; 
    }
  };

  const handleProfileButton = async() => {
    if (isNavigatingProfile.current) return;
    isNavigatingProfile.current = true;

    try {
      navigate(`/userProf`, {replace: true});
    } catch (error) {
      setError("An error occured. Please try again later")
    } finally {
      isNavigatingProfile.current = false; 
    }
  };

  return (
    <div className={styles["main-body-attractions"]}>
      {error && <p>{error}</p>}
      <div className={styles["person-profile-container"]} onClick={() => handleProfileButton()}>
        <div><img src={personProfile} alt="person icon"/></div>
        <div><h2>Profile</h2></div>
      </div>
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
              Explore the enchanting city of Iasi, Romania, where history meets
              modernity. Discover its rich cultural heritage, stunning
              architecture, and vibrant atmosphere.
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
      <div className={styles["container-subtitle-hotel"]}>
        <div>
          <h2 className={styles["subtitle-hotel"]}>All hotels</h2>
        </div>
        <div className={styles["search-bar-container"]}>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder=" 🔍 Search by hotel name"
            className={styles["search-input"]}
          />
        </div>
      </div>
      <div className={styles["grid-container"]}>
        {error && <p>{error}</p>}
        {filteredHotelNames.length > 0 && (
          <div className={styles["grid"]}>
            {filteredHotelNames.map((name, index) => {
              const filteredHotel = hotelData.find(
                (hotel) => hotel.name === name
              );
              return (
                <div
                  key={index}
                  className={styles["row"]}
                  onClick={() => handleButtonsHotelClick(name)}
                >
                  <div className={styles["col"]}>
                    <HotelCard
                      hotelName={name}
                      hotelDescription={
                        filteredHotel ? filteredHotel.description : ""
                      }
                      hotelPhoto={filteredHotel ? filteredHotel.image : ""}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttractionsPage;
