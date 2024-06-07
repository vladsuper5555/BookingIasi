import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "./components/CategoryCard";
import axios from "axios";
import attractionsStyle from "./styles/attraction-detail-page.module.css";
import ScrollToTop from "./utils/hooks/ScrollToTop";
import RenderTracks from "./components/TracksSection";

const AttractionDetailsPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [error, setError] = useState("");
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [maxDistance, setMaxDistance] = useState(7000);
  const mapRef = useRef(null);
  const { hotelName } = useParams();

  useEffect(() => {
    const fetchAttractionsForHotel = async () => {
      try {
        const response = await fetch(
            "/api/attractionshotel",
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
        if (data.success) {
          const transformedAttractions = data.attractions.map((attraction) => ({
            name: attraction.Nume_atractie,
            distance: attraction.Distanta_de_la_hotel,
            category: attraction.Categorie,
            description: attraction.Descriere,
            link: attraction.link,
          }));
          transformedAttractions.sort((a, b) => a.distance - b.distance);
          setAttractions(transformedAttractions);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("An error occurred. Please try again later");
      }
    };

    fetchAttractionsForHotel();
  }, [hotelName]);

  useEffect(() => {
    const filtered = attractions.filter(
        (attraction) => attraction.distance <= maxDistance
    );
    setFilteredAttractions(filtered);
  }, [maxDistance, attractions]);

  const handleAttractionClick = (attractionName) => {
    setSelectedAttraction(attractionName);
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDistanceChange = (e) => {
    const newValue = Number(e.target.value);
    setMaxDistance(newValue);
  };
  

  const groupAttractionsByCategory = (attractions) => {
    return attractions.reduce((groups, attraction) => {
      const category = attraction.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(attraction);
      return groups;
    }, {});
  };

  return (
      <div className="main-body-attractions">
        <ScrollToTop />
        <div className={attractionsStyle["title-container"]}>
          <h3 className={attractionsStyle["attr-title-page"]}>
            About {hotelName}
          </h3>
        </div>
        {/* <div ref={mapRef}>
          <MapComponent query={selectedAttraction || hotelName} />
        </div> */}
        <div className={attractionsStyle["subtitle-container"]}>
          <div>
            <h3 className={attractionsStyle["attr-subtitle-page"]}>
              Attractions for {hotelName}
            </h3>
          </div>
          <div>
            {error && <p>{error}</p>}
            <div className="distance-filter-container">
              <label
                  htmlFor="distanceFilter"
                  className={attractionsStyle["label-search"]}
              >
                Show attractions by range:
              </label>
              <input
              type="range"
              id="distanceFilter"
              value={maxDistance}
              onChange={handleDistanceChange}
              min="0"
              max="10000" 
              step="100" 
              className={attractionsStyle["input-search-distance"]}
            />
            <span>{maxDistance} meters</span> {/* Display selected value */}
            </div>
          </div>
        </div>
        <div className={attractionsStyle["grid-layout"]}>
          {Object.entries(groupAttractionsByCategory(filteredAttractions)).map(
              ([category, attractions]) => (
                  <CategoryCard
                      key={category}
                      category={category}
                      attractions={attractions}
                      onAttractionClick={handleAttractionClick}
                  />
              )
          )}
        </div>
       
          <RenderTracks hotelName={hotelName} />
  
      </div>
  );
};

export default AttractionDetailsPage;