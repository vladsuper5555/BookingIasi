import React, { useState } from "react";
import styles from "../styles/attractions-card-style.module.css";
import { useParams } from "react-router-dom";

const CategoryCard = ({ category, attractions, onAttractionClick}) => {
  const [activeDescription, setActiveDescription] = useState(null);
  const { hotelName } = useParams();
  const handleTextClick = (description, name) => {
    if (activeDescription === description) {
      setActiveDescription(null);
    } else {
      setActiveDescription(description);
      onAttractionClick(name); 
    }
  };

  return (
    <div className={styles["main-container-category"]}>
      <div className={styles["category-header"]}>
        <h2>{category}</h2>
      </div>
      <div className={styles["attractions-list"]}>
        {attractions.map((attraction, index) => (
          <div key={index}>
            <div className={styles["category-card-item"]}>
              <p onClick={() => handleTextClick(attraction.description, attraction.name)}>
                {attraction.name}
              </p>
              <p className={styles["attraction-distance"]}>{attraction.distance} m</p>
            </div>
            {activeDescription === attraction.description && (
              <div className={styles["description"]}>
                <hr className={styles["popup-line"]} />
                <p>
                  <strong>{attraction.description}</strong>
                </p>
                {attraction.link && (
                  <a href={attraction.link} target="_blank" rel="noopener noreferrer">
                    More Info
                  </a>
                )}
                <p>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(hotelName)}&destination=${encodeURIComponent(attraction.name)}&travelmode=walking`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Walking Directions to {attraction.name}
                  </a>
                </p>
                <hr className={styles["popup-line"]} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default CategoryCard;
