import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
          setAttractions(data.attractions);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("An error occurred. Please try again later");
      }
    };

    fetchAttractionsForHotel();

    return () => {
      
    };
  }, [hotelName]);

  return (
    <div>
      <h3>Attractions for {hotelName}</h3>
      {error && <p>{error}</p>}
      <ul>
        {attractions.length > 0 ? (
          attractions.map((attraction, index) => (
            <li key={index}>
              <strong>Name:</strong> {attraction.Nume_atractie}
              <br />
              <strong>Distance:</strong> {attraction.Distanta_de_la_hotel}
              <br />
              <strong>Category:</strong> {attraction.Categorie}
              <br />
              <strong>Description:</strong> {attraction.Descriere}
              <br />
            </li>
          ))
        ) : (
          <li>No attractions found for {hotelName}</li>
        )}
      </ul>
    </div>
  );
};

export default AttractionDetailsPage;
