import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "./components/CategoryCard";
import MapComponent from "../pointsOfInterest/mapComponent";
import axios from "axios";
import attractionsStyle from "./styles/attraction-detail-page.module.css";

const AttractionDetailsPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [error, setError] = useState("");
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [maxDistance, setMaxDistance] = useState(7000);
  const mapRef = useRef(null);
  const { hotelName } = useParams();

  const [newTrails, setNewTrails] = useState({
    hard: [],
    medium: [],
    easy: [],
  });

  const [trails, setTrails] = useState({
    hardOrder: [],
    mediumOrder: [],
    easyOrder: [],
  });

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

  useEffect(() => {
    const generateTrail = (attractions, difficulty, maxDistance) => {
      const filteredAttractions = attractions.filter(
          (attraction) => attraction.distance <= maxDistance
      );
      // let percentage;
      let numberOfAttractions;
      if (difficulty === "hard") {
        numberOfAttractions = 7;
      } else if (difficulty === "medium") {
        numberOfAttractions = 7;
      } else if (difficulty === "easy") {
        numberOfAttractions = 5;
      }
      const selectedAttractions = filteredAttractions
          .sort(() => 0.5 - Math.random())
          .slice(0, numberOfAttractions)
          .map((attraction) => attraction.name);
      return selectedAttractions;
    };

    const newGeneratedTrails = {
      hard: generateTrail(attractions, "hard", 1000),
      medium: generateTrail(attractions, "medium", 600),
      easy: generateTrail(attractions, "easy", 300),
    };

    setNewTrails(newGeneratedTrails);
  }, [attractions]);

  const fetchTrailData = async (difficulty) => {
    try {
      const response = await axios.post(
          "http://localhost:5173/api/attractionshotelwithdirections",
          {
            hotelName,
            difficulty,
            trails: newTrails,
          }
      );
      if (response.data.success) {
        const waypointOrder = response.data.directions.routes[0].waypoint_order;
        console.log('Waypoint Order:', waypointOrder); // Debug line

        let orderedTrail = waypointOrder.map(index => newTrails[difficulty][index]);
        orderedTrail = orderedTrail.filter(attraction => attraction !== undefined); // Remove undefined values
        console.log(`Ordered Trail for ${difficulty}:`, orderedTrail); // Debug line

        setTrails((prevTrails) => ({
          ...prevTrails,
          [difficulty + "Order"]: orderedTrail,
        }));
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(`Error fetching trail data for ${difficulty} trail: ${error.message}`);
    }
  };

  useEffect(() => {
    if (newTrails.hard.length > 0 || newTrails.medium.length > 0 || newTrails.easy.length > 0) {
      ["hard", "medium", "easy"].forEach((difficulty) => {
        fetchTrailData(difficulty);
      });
    }
  }, [newTrails]);

  const renderTrail = (difficulty) => {
    // const originalTrail = newTrails[difficulty].join(" -> ");
    const optimizedTrail = trails[difficulty + "Order"].join(" -> ");

    console.log(`Original trail length for ${difficulty}:`, newTrails[difficulty].length); // Debug line
    console.log(`Optimized trail length for ${difficulty}:`, trails[difficulty + "Order"].length); // Debug line

    const googleMapsUrl = (trail) => `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        hotelName
    )}&destination=${encodeURIComponent(
        hotelName
    )}&waypoints=${encodeURIComponent(trail.replace(/ -> /g, '|'))}&travelmode=walking`;

    return (
        <div key={difficulty} className={attractionsStyle["trail-category"]}>
          <h2 className={attractionsStyle["trail-category-title"]}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Trail</h2>
          {/* <p>Original order: {originalTrail}</p> */}
          <p>{optimizedTrail}</p>
        {/*  <button>*/}
        {/*    /!* <a href={googleMapsUrl(originalTrail)} target="_blank" rel="noopener noreferrer">*/}
        {/*  See Original Trail on Maps*/}
        {/*</a> *!/*/}
        {/*  </button>*/}
          <button className={attractionsStyle["button-to-maps"]}>
            <a className={attractionsStyle["link-to-maps"]} href={googleMapsUrl(optimizedTrail)} target="_blank" rel="noopener noreferrer">
              View on Maps
            </a>
          </button>
        </div>
    );
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
        <div className={attractionsStyle["trails-container"]}>
          <div className={attractionsStyle["tracks-container-title"]}>
            <h2 className={attractionsStyle["tracks-title"]}>Tracks for {hotelName}</h2>
          </div>
          <div className={attractionsStyle["tracks-container-subtitle"]}>
            <h3 className={attractionsStyle["tracks-subtitle"]}>Tracks by difficulty</h3>
          </div>
          {["hard", "medium", "easy"].map((difficulty) => renderTrail(difficulty))}
        </div>
      </div>
  );
};

export default AttractionDetailsPage;
