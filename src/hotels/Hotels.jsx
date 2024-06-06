// MainPage.jsx
import React from "react";
import { Link, redirect, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Mesaj from "./Mesaj";
import PrincipalImageUnirea from "./images/hotels/UnireaHotelSpa/principal.jpg";
import PrincipalImagePrestige from "./images/hotels/ApartamentHotelPrestige/principal.jpg";
import Principal2Unirea from "./images/hotels/UnireaHotelSpa/principal2.jpg";
import Principal2Prestige from "./images/hotels/ApartamentHotelPrestige/principal.jpg";
import ContactImageUnirea from "./images/hotels/UnireaHotelSpa/iasi.jpg";
import Feature1Unirea from "./images/hotels/UnireaHotelSpa/event rooms/restaurant1.jpg";
import Feature2Unirea from "./images/hotels/UnireaHotelSpa/pool or spa/pool.jpg";
import Feature3Unirea from "./images/hotels/UnireaHotelSpa/apartments/app_id_1/rooms/room1/room1.jpg";
import Feature1Prestige from "./images/hotels/ApartamentHotelPrestige/apartments/app_id_1/rooms/room1/dormitor.jpg";
import Feature2Prestige from "./images/hotels/ApartamentHotelPrestige/Kitchen/bucatarie.jpg";
import Feature3Prestige from "./images/hotels/ApartamentHotelPrestige/apartments/app_id_2/bathroom/baie.jpg";
import No_parking from "./images/Icons/features/no_parking_lot.svg";
import Parking from "./images/Icons/features/parking_lot.svg";
import No_pets from "./images/Icons/features/no_pets.svg";
import Pets from "./images/Icons/features/pets.svg";
import No_smoking from "./images/Icons/features/no_smoking.svg";
import Smoking from "./images/Icons/features/smoking.svg";
import event_allowed from "./images/Icons/features/events.svg";
import contact_cash_or_card from "./images/Icons/contact/cash_or_card.svg";
import contact_email from "./images/Icons/contact/email.svg";
import contact_location from "./images/Icons/contact/location.svg";
import contact_telephone from "./images/Icons/contact/telephone.svg";
import styles from "./styles/main-page.module.css";
import ScrollToTop from "../attractions/utils/hooks/ScrollToTop";
import profilePerson from "../attractions/assets/svg/person-profile.svg";

const Hotels = ({
  name,
  checkinTime,
  checkoutTime,
  openingHours,
  priceRange,
  description,
  petsAllowed,
  parkingFacility,
  smokingAllowed,
  event,
  review,
  aggregateRating,
  address,
  email,
  telephone,
  paymentAccepted,
  currenciesAccepted,
  amenityFeature,
}) => {
  const [hotelData, setHotelData] = useState([]);
  const [error, setError] = useState("");
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const isNavigating = useRef(false);
  const isNavigatingPanoramas = useRef(false);

  const hotelName = hotelId;

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  }

  const fetchInfoForHotel = async () => {
    try {
      const response = await fetch("/api/hotelsinfo", {
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
      console.log(data);
      if (data.success) {
        setHotelData(data.info[0]);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
    }
  };
  useEffect(() => {
    if (hotelName) {
      fetchInfoForHotel(hotelName);
    }
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  const handleSeeAttractionsClick = async (hotelName) => {
    if (isNavigating.current) return;
    isNavigating.current = true;

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
      console.log(data);
      if (data.success) {
        navigate(`/attractions/${hotelName}`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
    } finally {
      isNavigating.current = false;
    }
  };
  const handleSeePanoramasClick = async (hotelName) => {
    if (isNavigating.current) return;
    isNavigating.current = true;

    try {
          navigate(`/panoramas?hotel=${hotelName}`); 
    } catch (error) {
      setError("An error occurred. Please try again later");
    } finally {
      isNavigating.current = false;
    }
  };
  return (
    <div className={styles["general-structure"]}>
      <ScrollToTop />
      <nav className={styles.navbar}>
        <a
          href="#about-section"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("about-section");
          }}
        >
          About
        </a>
        <a
          href="#features-section"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("features-section");
          }}
        >
          Features
        </a>
        <a
          href="#section_Review"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("section_Review");
          }}
        >
          Reviews
        </a>
        <a
          href="#section_Contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("section_Contact");
          }}
        >
          Contact
        </a>
      </nav>
      <div className={styles.hotels}>
        <div className={styles.header}>
          <div className={styles["container-header"]}>
            <h1 className={styles["hotel-name-title-header"]}>{hotelData?.name}</h1>
            <div className={styles.subtitle}>
              <div className={styles["horizontal-line"]}></div>
              <div className={styles["horizontal-line-text"]}>Hotel</div>
              <div className={styles["horizontal-line"]}></div>
            </div>
          </div>

          <div className={styles["header-image"]}>
            {hotelData?.name === "Unirea Hotel & Spa" ? (
              <img src={PrincipalImageUnirea} alt="Unirea Hotel & Spa" />
            ) : (
              <img src={PrincipalImagePrestige} alt="Prestige Hotel" />
            )}
            <div className={styles["header-info"]}>
              <div className={styles["header-info-sections"]}>
                <p>
                  <span className={styles.inBold}>Check-in:</span>{" "}
                  {hotelData?.checkinTime}PM
                </p>
                <p>
                  <span className={styles.inBold}>Check-out:</span>{" "}
                  {hotelData?.checkoutTime}PM
                </p>
              </div>
              <div className={styles["vertical-line"]}></div>
              <div className={styles["header-info-sections"]}>
                <p>
                  <span className={styles.inBold}>Opening hours:</span>{" "}
                  {hotelData?.openingHours}
                </p>
              </div>
              <div className={styles["vertical-line"]}></div>
              <div className={styles["header-info-sections"]}>
                <p>
                  <span className={styles.inBold}>Price: </span>
                  {hotelData?.priceRange}€{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <section id="about-section" className={styles.about}>
          <div className={styles["subtitle-about"]}>
            <div className={styles["horizontal-line-about"]}></div>
            <div className={styles["horizontal-line-text"]}> </div>
            <div className={styles["horizontal-line-about"]}></div>
          </div>

          <div className={styles.continut}>
            <div className={styles["continut-container-info"]}>
              {" "}
              <div className={styles.titluSectiune1}>About</div>
              <div className={styles.sectiuneText}>{hotelData?.description}</div>
            </div>

            <div className={styles.sectiuneImagine}>
              {hotelData?.name === "Unirea Hotel & Spa" ? (
                <img src={Principal2Unirea} alt="Unirea Hotel & Spa" />
              ) : (
                <img src={Principal2Prestige} alt="Prestige Hotel" />
              )}
            </div>
          </div>
        </section>
        <section id="features-section" className={styles.features}>
          <div className={styles["subtitle-about"]}>
            <div className={styles["horizontal-line-about"]}></div>
            <div className={styles["horizontal-line-text"]}> </div>
            <div className={styles["horizontal-line-about"]}></div>
          </div>
          <div className={styles.titluSectiune1}>Features</div>
          <div className={styles["feature-images"]}>
            {hotelData?.name === "Unirea Hotel & Spa" ? (
              <img src={Feature1Unirea} alt="Unirea Hotel & Spa" />
            ) : (
              <img src={Feature1Prestige} alt="Prestige Hotel" />
            )}
            {hotelData?.name === "Unirea Hotel & Spa" ? (
              <img src={Feature2Unirea} alt="Unirea Hotel & Spa" />
            ) : (
              <img src={Feature2Prestige} alt="Prestige Hotel" />
            )}
            {hotelData?.name === "Unirea Hotel & Spa" ? (
              <img src={Feature3Unirea} alt="Unirea Hotel & Spa" />
            ) : (
              <img src={Feature3Prestige} alt="Prestige Hotel" />
            )}
          </div>
          <div className={styles.continut}>
            <div className={styles.sectiuneText}>
              <div className={styles.oneUnderAnother}>
                {hotelData?.amenityFeature}
                <div
                  className={styles.linksDistance}
                  onClick={() => handleSeePanoramasClick(hotelName)}
                >
                  <div>
                    <a>Click to see the virtual tour!</a>
                  </div>
                </div>

                <div
                  className={styles.linksDistance}
                  onClick={() => handleSeeAttractionsClick(hotelName)}
                >
                  <div>
                    <a>Click to see attraction around!</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.featuresBox}>
              <div className={styles["feature-container"]}>
                {hotelData?.petsAllowed ? (
                  <>
                    <img src={Pets} alt="image" className={styles.smallerSize} />
                    Pets allowed
                  </>
                ) : (
                  <>
                    <img src={No_pets} alt="image" className={styles.smallerSize} />
                    No pets allowed
                  </>
                )}
              </div>
              <div className={styles["feature-container"]}>
                {hotelData?.parkingFacility ? (
                  <>
                    <img
                      src={Parking}
                      alt="parking allowed"
                      className={styles.smallerSize}
                    />
                    Parking lot available
                  </>
                ) : (
                  <>
                    <img
                      src={No_parking}
                      alt="no parking"
                      className={styles.smallerSize}
                    />
                    Parking lot not available
                  </>
                )}
              </div>
              <div className={styles["feature-container"]}>
                {hotelData?.smokingAllowed ? (
                  <div>
                    <img src={Smoking} alt="image" className={styles.smallerSize} />
                    Smoking is allowed
                  </div>
                ) : (
                  <div >
                    <img src={No_smoking} alt="image" className={styles.smallerSize} />
                    Smoking is not allowed
                  </div>
                )}
              </div>
              <div className={styles["feature-container"]}>
                <>
                  <img
                    src={event_allowed}
                    alt="image"
                    className={styles.smallerSize}
                  />
                  Events allowed
                </>
              </div>
            </div>
          </div>
        </section>
        <section id="section_Review" className={styles.reviews}>
          <div className={`${styles.upperSection} ${styles["reviews-container"]}`}>
            <div className={`${styles.titluSectiune} ${styles["reviews-title"]}`}>Reviews</div>
            <div className={styles.overallRating}>
              Overall rating: {hotelData?.aggregateRating} ★
            </div>
          </div>
          <div className={styles["review-container-person"]}>
            <div className={styles["profile-person-icon"]}>
              <img src={profilePerson} alt="profile person icon" />
            </div>
            {hotelData?.name === "Unirea Hotel & Spa" ? (
               <a href="https://maps.app.goo.gl/1RtMrNvJyZVkfMwR8" target="_blank"> <div className={styles.recenzie}>{hotelData?.review}</div></a>
            ) : (
               <a href="https://maps.app.goo.gl/8Tq3jKjTrhGmjTQU9" target="_blank"> <div className={styles.recenzie}>{hotelData?.review}</div></a>
            )}
          
          </div>
        </section>

        <section id="section_Contact" className={styles.contact}>
          <div className={styles["contact-image-container"]}>
            <img
              src={ContactImageUnirea}
              alt="imagine din interior"
              className={styles["contact-image"]}
            />
            <div className={styles.contactBox}>
              <div className={styles.titluSectiune}>Contact</div>
              <p>
                Discover the pleasure of a perfect stay in a hotel located right
                in the heart of Iași.
              </p>
              <address className={styles.addressBox}>
                <div>
                  <img
                    src={contact_location}
                    alt="image"
                    className={styles.smallerSize}
                  />
                  {hotelData?.address}
                </div>
                <div>
                  <img
                    src={contact_email}
                    alt="image"
                    className={styles.smallerSize}
                  />
                  {hotelData?.email}
                </div>
                <div>
                  <img
                    src={contact_telephone}
                    alt="image"
                    className={styles.smallerSize}
                  />
                  {hotelData?.telephone}
                </div>
                <div>
                  <img
                    src={contact_cash_or_card}
                    alt="image"
                    className={styles.smallerSize}
                  />
                  Currency accepted: {hotelData?.currenciesAccepted}
                </div>
              </address>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Hotels;
