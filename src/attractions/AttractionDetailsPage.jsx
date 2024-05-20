import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "./components/CategoryCard"; 
import MapComponent from "../pointsOfInterest/mapComponent"; 

const AttractionDetailsPage = () => {
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState("");
  const { hotelName } = useParams();

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

  return (
    <div className="main-body-attractions">
      <h3 className="attr-title-page">Attractions for {hotelName}</h3>
      {error && <p>{error}</p>}
      <div className="grid-layout">
        {Object.entries(groupAttractionsByCategory(attractions)).map(
          ([category, attractions]) => (
            <CategoryCard
              key={category}
              category={category}
              attractions={attractions}
            />
          )
        )}
      </div>
      {/*<h1>Titlu pentru harta inca nu m am gandit...</h1>*/}
      <MapComponent /> {/* */}
    </div>
  );
};

export default AttractionDetailsPage;
