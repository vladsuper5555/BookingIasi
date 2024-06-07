import React, { useState } from "react";
import { useParams } from "react-router-dom";
import attractionsCard from "../styles/attractions-section-style.module.css";
import arrow from "../images/Icons/arrow-attr.svg";

const AttractionCategory = ({ category, attractions }) => {
  const [activeDescription, setActiveDescription] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { hotelId } = useParams();

  const handleDescriptionClick = (description) => {
    if (activeDescription === description) {
      setActiveDescription(null);
    } else {
      setActiveDescription(description);
    }
  };

  const handleCategoryClick = () => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  return (
    <div>
      <div className={attractionsCard["header-category-container"]}>
        <h2
          className={attractionsCard["category-title-card-container"]}
          onClick={handleCategoryClick}
        >
          {category}
        </h2>
        <div>
          <button
            className={attractionsCard["show-attractions-list-button"]}
            onClick={handleCategoryClick}
          >
            <img
              src={arrow}
              alt="arrow"
              className={`${attractionsCard["arrow-attr"]} ${
                expandedCategory === category
                  ? attractionsCard["arrow-attr-expanded"]
                  : ""
              }`}
            />
          </button>
        </div>
      </div>
      {expandedCategory === category && (
        <div className={attractionsCard["attractions-info-container"]}>
          {attractions.map((attraction, index) => (
            <div key={index}>
              <div className={attractionsCard["attractions-details"]}>
                <p
                className={attractionsCard["attractions-name-info"]}
                  onClick={() =>
                    handleDescriptionClick(attraction.description)
                  }
                >
                  {attraction.name}
                </p>
                <p>{attraction.distance}m</p>
              </div>
              {activeDescription === attraction.description && (
                <div className={attractionsCard["description-attr-container"]}>
                  <p>{attraction.description}</p>
                  <p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                        hotelId
                      )}&destination=${encodeURIComponent(
                        attraction.name
                      )}&travelmode=walking`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Walking Directions to {attraction.name}
                    </a>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttractionCategory;
