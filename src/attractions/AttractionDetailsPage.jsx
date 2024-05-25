import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "./components/CategoryCard";
import MapComponent from "../pointsOfInterest/mapComponent";
import attractionsStyle from "./styles/attraction-detail-page.module.css";

const AttractionDetailsPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [error, setError] = useState("");
  const { hotelName } = useParams();
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [maxDistance, setMaxDistance] = useState(7000); // Default to 300 meters
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchAttractionsForHotel = async () => {
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
          const transformedAttractions = data.attractions.map((attraction) => ({
            name: attraction.Nume_atractie,
            distance: attraction.Distanta_de_la_hotel,
            category: attraction.Categorie,
            description: attraction.Descriere,
            link: attraction.link, // TO DO
          }));
          // Sort attractions by distance
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

    return () => {
      // Cleanup function if needed
    };
  }, [hotelName]);

  useEffect(() => {
    const filtered = attractions.filter(
      (attraction) => attraction.distance <= maxDistance
    );
    setFilteredAttractions(filtered);
  }, [maxDistance, attractions]);

  // Function to group attractions by category
  const groupAttractionsByCategory = (attractions) => {
    const groupedAttractions = {};
    attractions.forEach((attraction) => {
      if (!groupedAttractions[attraction.category]) {
        groupedAttractions[attraction.category] = [];
      }
      groupedAttractions[attraction.category].push(attraction);
    });
    return groupedAttractions;
  };

  const handleAttractionClick = (attractionName) => {
    setSelectedAttraction(attractionName);
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDistanceChange = (e) => {
    setMaxDistance(Number(e.target.value));
  };

  return (
    <div className="main-body-attractions">
      <div className={attractionsStyle["title-container"]}>
        <h3 className={attractionsStyle["attr-title-page"]}>
          About {hotelName}
        </h3>
      </div>
      <div ref={mapRef}>
        <MapComponent query={selectedAttraction || hotelName} />
      </div>
      <div className={attractionsStyle["subtitle-container"]}>
        <div>
          <h3 className={attractionsStyle["attr-subtitle-page"]}>
            About {hotelName}
          </h3>
        </div>
        <div>
          {error && <p>{error}</p>}
          <div className="distance-filter-container">
            <label htmlFor="distanceFilter" className={attractionsStyle["label-search"]}>
              Show attractions within (meters):
            </label>
            <input
              type="input"
              id="distanceFilter"
              value={maxDistance}
              onChange={handleDistanceChange}
              min="0"
              className={attractionsStyle["input-search-distance"]}
            />
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
      <div>
        <div className={attractionsStyle["tracks-container-title"]}>
          <h1 className={attractionsStyle["tracks-title"]}>Tracks</h1> {/* TO DO  */}
        </div>
      </div>
    </div>
  );
};

export default AttractionDetailsPage;
