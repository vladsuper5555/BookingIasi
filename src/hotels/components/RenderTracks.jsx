import attractionStyleSec from "../styles/attractions-section-style.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

const RenderTracks = ({ hotelName }) => {
  const [activityIndex, setActivityIndex] = useState(null);
  const [recommendedTrail, setRecommendedTrail] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [newTrails, setNewTrails] = useState({ hard: [], medium: [], easy: [] });
  const [trails, setTrails] = useState({ hardOrder: [], mediumOrder: [], easyOrder: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttractionsForHotel = async () => {
      try {
        const response = await fetch("/api/attractionshotel", {
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
    const fetchUserActivityIndex = async () => {
      try {
        const response = await fetch("/api/useractivityindex", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: '' }),
        });
        const data = await response.json();
        if (data.success) {
          setActivityIndex(data.activityIndex);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(`Error fetching user activity index: ${error.message}`);
      }
    };

    fetchUserActivityIndex();
  }, []);

  const generateRecommendedTrail = (attractions, activityIndex, maxDistance) => {
    let numberOfAttractions;
    if (activityIndex <= 30) {
      numberOfAttractions = 3;
    } else if (activityIndex <= 60) {
      numberOfAttractions = 5;
    } else if (activityIndex <= 90) {
      numberOfAttractions = 7;
    } else {
      numberOfAttractions = 10;
    }

    const selectedAttractions = attractions
      .filter((attraction) => attraction.distance <= maxDistance)
      .sort(() => 0.5 - Math.random())
      .slice(0, numberOfAttractions)
      .map((attraction) => attraction.name);

    return selectedAttractions;
  };

  useEffect(() => {
    if (activityIndex !== null && attractions.length > 0) {
      const newRecommendedTrail = generateRecommendedTrail(attractions, activityIndex, 3000);
      setRecommendedTrail(newRecommendedTrail);
    }
  }, [activityIndex, attractions]);

  useEffect(() => {
    const generateTrail = (attractions, difficulty, maxDistance) => {
      const filteredAttractions = attractions.filter(
        (attraction) => attraction.distance <= maxDistance
      );
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
      const response = await axios.post("/api/attractionshotelwithdirections", {
        hotelName,
        difficulty,
        trails: newTrails,
      });
      if (response.data.success) {
        const routes = response.data.directions.routes;
        let orderedTrail;
        if (routes.length > 0 && routes[0].waypoint_order) {
          const waypointOrder = routes[0].waypoint_order;
          orderedTrail = waypointOrder.map(
            (index) => newTrails[difficulty][index]
          );
        } else {
          console.error(`No waypoint order for ${difficulty} trail`);
          orderedTrail = newTrails[difficulty];
        }
        orderedTrail = orderedTrail.filter(
          (attraction) => attraction !== undefined
        );
        setTrails((prevTrails) => ({
          ...prevTrails,
          [difficulty + "Order"]: orderedTrail,
        }));
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(
        `Error fetching trail data for ${difficulty} trail: ${error.message}`
      );
      setTrails((prevTrails) => ({
        ...prevTrails,
        [difficulty + "Order"]: newTrails[difficulty],
      }));
    }
  };
  
  useEffect(() => {
    if (
      newTrails.hard.length > 0 ||
      newTrails.medium.length > 0 ||
      newTrails.easy.length > 0
    ) {
      ["hard", "medium", "easy"].forEach((difficulty) => {
        fetchTrailData(difficulty);
      });
    }
  }, [newTrails]);

  const renderTrail = (difficulty, trail) => {
    if (!trail) {
      return null;
    }

    const optimizedTrail = trail.join(" -> ");

    const googleMapsUrl = (trail) =>
      `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        hotelName
      )}&destination=${encodeURIComponent(
        hotelName
      )}&waypoints=${encodeURIComponent(
        trail.replace(/ -> /g, "|")
      )}&travelmode=walking`;

    return (
      <div key={difficulty} className={attractionStyleSec["trail-category"]}>
        <h2 className={attractionStyleSec["trail-category-title"]}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Trail
        </h2>
        <p>{optimizedTrail}</p>
        <button className={attractionStyleSec["button-to-maps"]}>
          <a
            className={attractionStyleSec["link-to-maps"]}
            href={googleMapsUrl(optimizedTrail)}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Maps
          </a>
        </button>
      </div>
    );
  };

  return (
    <div className={attractionStyleSec["trails-container"]}>
      <div className={attractionStyleSec["tracks-container-title"]}>
        <h2 className={attractionStyleSec["tracks-title"]}>
          Tracks for {hotelName}
        </h2>
      </div>
      <div className={attractionStyleSec["tracks-container-subtitle"]}>
        <h3 className={attractionStyleSec["tracks-subtitle"]}>
          Tracks by difficulty
        </h3>
      </div>
      {recommendedTrail.length > 0 && renderTrail("Recommended", recommendedTrail)}
      {trails.hardOrder.length > 0 && renderTrail("Hard", trails.hardOrder)}
      {trails.mediumOrder.length > 0 && renderTrail("Medium", trails.mediumOrder)}
      {trails.easyOrder.length > 0 && renderTrail("Easy", trails.easyOrder)}
    </div>
  );
};

export default RenderTracks;