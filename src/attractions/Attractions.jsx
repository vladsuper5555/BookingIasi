import React, { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles/main-page-style.css';

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
    <div>
      {error && <p>{error}</p>}
      {hotelNames.length > 0 && (
        <ul>
          {hotelNames.map((name, index) => (
            <div key={index}>
              <button onClick={() => fetchAttractionsForHotel(name)} className="button-to-attractions">
                {name}
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttractionsPage;
