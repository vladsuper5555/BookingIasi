import React, { useState } from "react";
import "../styles/attractions-card-style.css";

const CategoryCard = ({ category, attractions, onAttractionClick }) => {
  const [activeDescription, setActiveDescription] = useState(null);

  const handleTextClick = (description, name) => {
    if (activeDescription === description) {
      setActiveDescription(null);
    } else {
      setActiveDescription(description);
      onAttractionClick(name); 
    }
  };

  return (
    <div className="main-container-category">
      <div className="category-header">
        <h2>{category}</h2>
      </div>
      <ul className="attractions-list">
        {attractions.map((attraction, index) => (
          <li key={index}>
            <div className="category-card-item">
              <p onClick={() => handleTextClick(attraction.description, attraction.name)}>
                {attraction.name}
              </p>
              <p className="attraction-distance">{attraction.distance} m</p>
            </div>
            {activeDescription === attraction.description && (
              <div className="description">
                <hr className="popup-line" />
                <p>
                  <strong>{attraction.description}</strong>
                </p>
                {/* Add the link if available */}
                {attraction.link && (
                  <a href={attraction.link} target="_blank" rel="noopener noreferrer">
                    More Info
                  </a>
                )}
                <hr className="popup-line" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryCard;
