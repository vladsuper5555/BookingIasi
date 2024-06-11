import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styleUserProf from "./UserProf.module.css";
import profilePicture from "./profilepic.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import womanProfile from "./images/woman-profile-picture.svg";
import manProfile from "./images/man-profile-picture.svg";
import healthIcon from "./images/icons/health.svg";
import optionsIcon from "./images/icons/options.svg";
import personalIcon from "./images/icons/personal-info.svg";

function UserProf() {
  ///const [userInfo, setUserInfo] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingHealthData, setEditingHealthData] = useState(false);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phoneNumber, setPhoneNumber] = useState("1234567890");
  const [birthDate, setBirthDate] = useState("2003-10-13");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [gender, setGender] = useState("Other");
  const [needsSpecialAssistance, setNeedsSpecialAssistance] = useState(false);
  const [firstNameTemp, setFirstNameTemp] = useState("");
  const [lastNameTemp, setLastNameTemp] = useState("");
  const [emailTemp, setEmailTemp] = useState("");
  const [phoneNumberTemp, setPhoneNumberTemp] = useState("");
  const [birthDateTemp, setBirthDateTemp] = useState("");
  const [heightTemp, setHeightTemp] = useState("");
  const [weightTemp, setWeightTemp] = useState("");
  const [genderTemp, setGenderTemp] = useState("");
  const [needsSpecialAssistanceTemp, setNeedsSpecialAssistanceTemp] =
    useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/users/accessTokens", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const userResponse = await fetch("/users/get-logged-user-info", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          const responseObject = await userResponse.json();
          if (responseObject.length > 0) {
            const userData = responseObject[0];
            setFirstName(userData.givenName);
            setLastName(userData.familyName);
            setEmail(userData.email);
            setBirthDate(formatDate(userData.birthDate));
            setHeight(userData.height.toString());
            setWeight(userData.weight.toString());
            setGender(userData.gender);
            setNeedsSpecialAssistance(userData.needsSpecialAssistance === 1);
          }

          navigate("/userProf");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error(
          "An error occurred while checking authentication:",
          error
        );
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful and cookie deleted");
        navigate("/");
      } else {
        //navigate('/login')
        console.error("Logout failed");
      }
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleEditProfile = () => {
    setFirstNameTemp(firstName);
    setLastNameTemp(lastName);
    setEmailTemp(email);
    setPhoneNumberTemp(phoneNumber);
    setEditingProfile(true);
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    setFirstName(firstNameTemp);
    setLastName(lastNameTemp);
    setEmail(emailTemp);
    setPhoneNumber(phoneNumberTemp);
    setEditingProfile(false);

    //in momentul in care da click pe save, se salveaza si in baza de date alea
    try {
      const response = await fetch("/users/update-logged-user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstNameTemp,
          lastNameTemp,
          emailTemp,
        }),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Profile data saved successfully.");
      } else {
        console.error("Failed to save profile data.");
      }
    } catch (error) {
      console.error("Error while saving  data:", error);
    }
  };

  const handleCancelProfile = () => {
    setEditingProfile(false);
  };

  const handleEditHealthData = () => {
    setBirthDateTemp(birthDate);
    setHeightTemp(height);
    setWeightTemp(weight);
    setGenderTemp(gender);
    setNeedsSpecialAssistanceTemp(needsSpecialAssistance);
    setEditingHealthData(true);
  };

  const handleSaveHealthData = () => {
    setBirthDate(birthDateTemp);
    setHeight(heightTemp);
    setWeight(weightTemp);
    setGender(genderTemp);
    setNeedsSpecialAssistance(needsSpecialAssistanceTemp);
    setEditingHealthData(false);
    // logica pentru salvarea in baza de date
  };

  const handleCancelHealthData = () => {
    setEditingHealthData(false);
  };

  const handleHealthFormClick = () => {
    navigate("/health-form");
  };

  return (
    <div className={styleUserProf["main-container"]}>
      <div className={styleUserProf.userWrapper}>
        <div className={styleUserProf.userHeader}>
          <div className={styleUserProf.leftContent}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              className={styleUserProf.backButton}
            />
          </div>
          <div className={styleUserProf.centerContent}>
            <p className={styleUserProf.greeting}>Hello {firstName}!</p>
          </div>
        </div>
        <div className={styleUserProf.userMain}>
          <div className={styleUserProf["user-general-info-container"]}>
            <div className={styleUserProf["user-profile-picture-container"]}>
              {gender === "male" ? (
                <img
                  src={manProfile}
                  alt="Male profile picture"
                  className={styleUserProf["user-profile-picture"]}
                />
              ) : (
                <img
                  src={womanProfile}
                  alt="Female profile picture"
                  className={styleUserProf["user-profile-picture"]}
                />
              )}
            </div>
            <p className={styleUserProf.userAboutLabel}>About</p>
            <p className={styleUserProf.userName}>
              {firstName} {lastName}
            </p>
            <div className={styleUserProf.userEmail}>{email}</div>
            <div className={styleUserProf["logout-button"]}>
              <Button
                variant="outlined"
                className={styleUserProf.logout}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>

          <div className={styleUserProf.userInfo}>
            <div className={styleUserProf.userPersonal}>
              <div className={styleUserProf["personal-info-container"]}>
                <p className={styleUserProf.userPersonalHeadline}>
                  Personal info
                </p>
                <div>
                  <img
                    src={personalIcon}
                    alt="personal info icon"
                    className={styleUserProf["personal-info-icon"]}
                  />
                </div>
              </div>

              <div>
                <p className={styleUserProf.userData}>
                  <span className={styleUserProf.firstName}>First Name:</span>{" "}
                  {editingProfile ? (
                    <TextField
                      type="text"
                      value={firstNameTemp}
                      onChange={(e) => setFirstNameTemp(e.target.value)}
                    />
                  ) : (
                    <span>{firstName}</span>
                  )}
                </p>
                <p className={styleUserProf.userData}>
                  <span className={styleUserProf.lastName}>Last Name:</span>{" "}
                  {editingProfile ? (
                    <TextField
                      type="text"
                      value={lastNameTemp}
                      onChange={(e) => setLastNameTemp(e.target.value)}
                    />
                  ) : (
                    <span>{lastName}</span>
                  )}
                </p>
                <p className={styleUserProf.userData}>
                  <span className={styleUserProf.email}>Email:</span>{" "}
                  {editingProfile ? (
                    <TextField
                      type="email"
                      value={emailTemp}
                      onChange={(e) => setEmailTemp(e.target.value)}
                    />
                  ) : (
                    <span>{email}</span>
                  )}
                </p>
                {editingProfile && (
                  <div className={styleUserProf.editButtons}>
                    <Button
                      variant="outlined"
                      className={styleUserProf.saveBtn}
                      onClick={handleSaveProfile}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      className={styleUserProf.cancelBtn}
                      onClick={handleCancelProfile}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
                <div className={styleUserProf.healthData}>
                  <p className={styleUserProf.userData}>
                    <span className={styleUserProf.healthDataInput}>
                      Birth Date:
                    </span>{" "}
                    {editingHealthData ? (
                      <TextField
                        type="date"
                        value={birthDateTemp}
                        onChange={(e) => setBirthDateTemp(e.target.value)}
                      />
                    ) : (
                      <span>{birthDate}</span>
                    )}
                  </p>
                  <p className={styleUserProf.userData}>
                    <span className={styleUserProf.healthDataInput}>
                      Height (cm):
                    </span>{" "}
                    {editingHealthData ? (
                      <TextField
                        type="number"
                        value={heightTemp}
                        onChange={(e) => setHeightTemp(e.target.value)}
                      />
                    ) : (
                      <span>{height}</span>
                    )}
                  </p>
                  <p className={styleUserProf.userData}>
                    <span className={styleUserProf.healthDataInput}>
                      Weight (kg):
                    </span>{" "}
                    {editingHealthData ? (
                      <TextField
                        type="number"
                        value={weightTemp}
                        onChange={(e) => setWeightTemp(e.target.value)}
                      />
                    ) : (
                      <span>{weight}</span>
                    )}
                  </p>
                  <p className={styleUserProf.userData}>
                    <span className={styleUserProf.healthDataInput}>
                      Gender:
                    </span>{" "}
                    {editingHealthData ? (
                      <Select
                        value={genderTemp}
                        onChange={(e) => setGenderTemp(e.target.value)}
                      >
                        <MenuItem value="Other">Other</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                      </Select>
                    ) : (
                      <span>{gender}</span>
                    )}
                  </p>
                  <p className={styleUserProf.userData}>
                    <span className={styleUserProf.healthDataInput}>
                      Needs special assistance:
                    </span>{" "}
                    {editingHealthData ? (
                      <Checkbox
                        checked={needsSpecialAssistanceTemp}
                        onChange={(e) =>
                          setNeedsSpecialAssistanceTemp(e.target.checked)
                        }
                      />
                    ) : (
                      <span>{needsSpecialAssistance ? "Yes" : "No"}</span>
                    )}
                  </p>
                  {editingHealthData && (
                    <div className={styleUserProf.editButtons}>
                      <Button
                        variant="outlined"
                        className={styleUserProf.saveBtn}
                        onClick={handleSaveHealthData}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        className={styleUserProf.cancelBtn}
                        onClick={handleCancelHealthData}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styleUserProf.userActions}>
              <div className={styleUserProf.userOptions}>
                <div className={styleUserProf["user-options-container"]}>
                  <p className={styleUserProf.userOptionsLabel}>Options</p>
                  <div>
                    <img
                      src={optionsIcon}
                      alt="options icon"
                      className={styleUserProf["user-options-icon"]}
                    />
                  </div>
                </div>
                <Button
                  variant="outlined"
                  onClick={handleEditProfile}
                  className={styleUserProf.editProfileBtn}
                >
                  Edit personal info
                </Button>
              </div>
              <div className={styleUserProf.userHealth}>
                <div className={styleUserProf["user-health-container"]}>
                  <p className={styleUserProf.userHealthLabel}>Health data</p>
                  <div>
                  <img
                      src={healthIcon}
                      alt="options icon"
                      className={styleUserProf["health-icon"]}
                    />
                  </div>
                </div>
                <a
                  href="#"
                  onClick={handleHealthFormClick}
                  className={styleUserProf.healthFormLink}
                >
                  Access the health formular
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProf;
