import React, { useState } from 'react';
import { Button, Checkbox, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Link, useNavigate} from 'react-router-dom';
import  './UserProf.css';
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
  const navigate = useNavigate();
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
    navigate('/health-form');
  };

  const commonStyles = {
    fontFamily: 'Montserrat, sans-serif',
    color: '#18181A'
  };

  const labelStyles = {
    ...commonStyles,
    fontSize: '20px',
    fontWeight: 'bold'
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
        {/*        <div className={style.profile-container}>
 */}
        <div className="profile-container">
          <div className="profil">
            <div className="profile-header">
              <h1 className="profile-title">Profile</h1>
            </div>
            <img className="profile-picture" src={profilePicture} alt="Profile" />
            <div className="edit-buttons">
              <Button variant="outlined" className="header-btn" style={commonStyles} onClick={handleEditProfile}>Edit</Button>
              <Button variant="outlined" className="header-btn logout-btn" style={commonStyles}>Logout</Button>
            </div>
          </div>
        </div>

        {/* informatii profil */}
        <div className="profile-info-container">
          <div className="info-item">
            <h2 className="input-label">First Name:</h2>
            {editingProfile ? (
              <TextField
                className="first-name"
                type="text"
                value={firstNameTemp}
                onChange={(e) => setFirstNameTemp(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{firstName}</h2>
            )}
          </div>
          <div className="info-item">
            <h2 className="input-label">Last Name:</h2>
            {editingProfile ? (
              <TextField
                className="last-name"
                type="text"
                value={lastNameTemp}
                onChange={(e) => setLastNameTemp(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{lastName}</h2>
            )}
          </div>
          <div className="info-item">
            <h2 className="input-label">Email:</h2>
            {editingProfile ? (
              <TextField
                className="email"
                type="email"
                value={emailTemp}
                onChange={(e) => setEmailTemp(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{email}</h2>
            )}
          </div>
          {editingProfile && (
            <div className="edit-buttons">
              <Button variant="outlined" className="save-btn" style={commonStyles} onClick={handleSaveProfile}>Save</Button>
              <Button variant="outlined" className="cancel-btn" style={commonStyles} onClick={handleCancelProfile}>Cancel</Button>
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
                <TextField
                  className="health-data-input"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
            ) : (
              <h2 className="info-content">{birthDate}</h2>
            )}
          </div>
          <div className="info-item">
            <h2 className="input-label">Height (cm):</h2>
            {editingHealthData ? (
            <TextField
                className="health-data-input"
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            ) : (
              <h2 className="info-content">{height}</h2>
            )}
          </div>
          <div className="info-item">
            <h2 className="input-label">Weight (kg):</h2>
            {editingHealthData ? (
              <TextField
              className="health-data-input"
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            ) : (
              <h2 className="info-content">{weight}</h2>
            )}
          </div>
          <div className="info-item">
            <h2 className="input-label">Gender:</h2>
            {editingHealthData ? (
            <Select
                     className="health-data-input"
                     value={gender}
                     onChange={(e) => setGender(e.target.value)}>
                     <MenuItem value="Male">Male</MenuItem>
                     <MenuItem value="Female">Female</MenuItem>
                     <MenuItem value="Other">Other</MenuItem>
                   </Select>
            ) : (
              <h2 className="info-content">{gender}</h2>
            )}
          </div>
          <div className="info-item">
          <InputLabel className='input-laber' style={labelStyles}>Needs Special Assistance:</InputLabel>
          {editingHealthData ? (
              <Checkbox
                className="health-data-input"
                type="checkbox"
                checked={needsSpecialAssistanceTemp}
                onChange={(e) => setNeedsSpecialAssistanceTemp(e.target.checked)}
              />
            ) : (
              <h2 className="info-content">{needsSpecialAssistance ? 'Yes' : 'No'}</h2>
            )}
          </div>
          {editingHealthData && (
            <div className="health-data-buttons">
              <Button varinat="outlined" className="save-btn" style={commonStyles} onClick={handleSaveHealthData}>Save</Button>
              <Button varinat="outlined" className="cancel-btn" style={commonStyles} onClick={handleCancelHealthData}>Cancel</Button>
            </div>
          )}
          {!editingHealthData && (
            <div className="health-data-buttons">
              <Button variant="outlined" className="edit-health-btn" style={commonStyles} onClick={handleEditHealthData}>Edit Health Data</Button>
              <Button variant="outlined" className="health-formular-btn" style={commonStyles} onClick={handleHealthFormClick}>HEALTH FORMULAR</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProf;
