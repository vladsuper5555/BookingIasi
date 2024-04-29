// UserProf.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserProf.css';
import profilePicture from './profilepic.jpg';

function UserProf() {
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingHealthData, setEditingHealthData] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('1234567890');
  const [birthDate, setBirthDate] = useState('2003-10-13');
  const [height, setHeight] = useState('170');
  const [weight, setWeight] = useState('70');
  const [gender, setGender] = useState('Other');
  const [needsSpecialAssistance, setNeedsSpecialAssistance] = useState(false);
  const [firstNameTemp, setFirstNameTemp] = useState('');
  const [lastNameTemp, setLastNameTemp] = useState('');
  const [emailTemp, setEmailTemp] = useState('');
  const [phoneNumberTemp, setPhoneNumberTemp] = useState('');
  const [birthDateTemp, setBirthDateTemp] = useState('');
  const [heightTemp, setHeightTemp] = useState('');
  const [weightTemp, setWeightTemp] = useState('');
  const [genderTemp, setGenderTemp] = useState('');
  const [needsSpecialAssistanceTemp, setNeedsSpecialAssistanceTemp] = useState(false);

  const handleEditProfile = () => {
    setFirstNameTemp(firstName);
    setLastNameTemp(lastName);
    setEmailTemp(email);
    setPhoneNumberTemp(phoneNumber);
    setEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setFirstName(firstNameTemp);
    setLastName(lastNameTemp);
    setEmail(emailTemp);
    setPhoneNumber(phoneNumberTemp);
    setEditingProfile(false);
    // logica pentru salvarea in baza de date
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

  return (
    <div className="page-container">
      {/* bara de navigare */}
      <div className="navbar-container">
        <header className="navbar">
          <div className="breadcrumbs">
            <Link to="/" className="breadcrumb">Home</Link> / User Profile
          </div>
        </header>
      </div>

      {/* profil */}
      <div className="profile-container-wrapper">
        <div className="profile-container">
          <div className="profil">
            <div className="profile-header">
              <h1 className="profile-title">Profile</h1>
            </div>
            <img className="profile-picture" src={profilePicture} alt="Profile" />
            <div className="edit-buttons">
              <button className="header-btn" onClick={handleEditProfile}>Edit</button>
              <button className="header-btn logout-btn">Logout</button>
            </div>
          </div>
        </div>

        {/* informatii profil */}
        <div className="profile-info-container">
          <div className="info-item">
            <h2 className="input-label">First Name:</h2>
            {editingProfile ? (
              <input
                type="text"
                value={firstNameTemp}
                onChange={(e) => setFirstNameTemp(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{firstName}</h2>
            )}
          </div>
          <div className="info-divider"></div>
          <div className="info-item">
            <h2 className="input-label">Last Name:</h2>
            {editingProfile ? (
              <input
                type="text"
                value={lastNameTemp}
                onChange={(e) => setLastNameTemp(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{lastName}</h2>
            )}
          </div>
          <div className="info-divider"></div>
          <div className="info-item">
            <h2 className="input-label">Email:</h2>
            {editingProfile ? (
              <input
                type="email"
                value={emailTemp}
                onChange={(e) => setEmailTemp(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{email}</h2>
            )}
          </div>
          <div className="info-divider"></div>
          <div className="info-item">
            <h2 className="input-label">Phone Number:</h2>
            {editingProfile ? (
              <input
                type="text"
                value={phoneNumberTemp}
                onChange={(e) => setPhoneNumberTemp(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{phoneNumber}</h2>
            )}
          </div>
          <div className="info-divider"></div>
          {editingProfile && (
            <div className="edit-buttons">
              <button className="save-btn" onClick={handleSaveProfile}>Save</button>
              <button className="cancel-btn" onClick={handleCancelProfile}>Cancel</button>
            </div>
          )}
        </div>
      </div>

      {/* health */}
      <div className="health-data-container-wrapper">
        <div className="health-data-container">
          <div className="info-item">
            <h2 className="input-label">Birth Date:</h2>
            {editingHealthData ? (
              <input
                className="health-data-input"
                type="date"
                value={birthDateTemp}
                onChange={(e) => setBirthDateTemp(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{birthDate}</h2>
            )}
          </div>
          <div className="info-divider"></div>
          <div className="info-item">
            <h2 className="input-label">Height (cm):</h2>
            {editingHealthData ? (
              <input
                className="health-data-input"
                type="text"
                value={heightTemp}
                onChange={(e) => setHeightTemp(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{height}</h2>
            )}
          </div>
          <div className="info-divider"></div>
          <div className="info-item">
            <h2 className="input-label">Weight (kg):</h2>
            {editingHealthData ? (
              <input
                className="health-data-input"
                type="text"
                value={weightTemp}
                onChange={(e) => setWeightTemp(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{weight}</h2>
            )}
          </div>
          <div className="info-divider"></div>
          <div className="info-item">
            <h2 className="input-label">Gender:</h2>
            {editingHealthData ? (
              <select
                className="health-data-input"
                value={genderTemp}
                onChange={(e) => setGenderTemp(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <h2 className="info-content">{gender}</h2>
            )}
          </div>
          <div className="info-divider"></div>
          <div className="info-item">
            <h2 className="input-label">Needs Special Assistance:</h2>
            {editingHealthData ? (
              <input
                className="health-data-input"
                type="checkbox"
                checked={needsSpecialAssistanceTemp}
                onChange={(e) => setNeedsSpecialAssistanceTemp(e.target.checked)}
              />
            ) : (
              <h2 className="info-content">{needsSpecialAssistance ? 'Yes' : 'No'}</h2>
            )}
          </div>
          <div className="info-divider"></div>
          {editingHealthData && (
            <div className="health-data-buttons">
              <button className="save-btn" onClick={handleSaveHealthData}>Save</button>
              <button className="cancel-btn" onClick={handleCancelHealthData}>Cancel</button>
            </div>
          )}
          {!editingHealthData && (
            <div className="health-data-buttons">
              <button className="edit-health-btn" onClick={handleEditHealthData}>Edit Health Data</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProf;
