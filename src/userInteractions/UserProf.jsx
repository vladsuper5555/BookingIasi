import React, { useEffect,useState } from 'react';
import { Button, Checkbox, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Link, useNavigate} from 'react-router-dom';
import  './UserProf.css';
import profilePicture from './profilepic.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function UserProf() {
  ///const [userInfo, setUserInfo] = useState(null);
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
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth', {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const userResponse = await fetch('/api/get-logged-user-info', {
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

          navigate('/userProf');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("An error occurred while checking authentication:", error);
      }
    };

    checkAuth();
  }, [navigate]);


  const handleLogout = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/logout', {
                method: "GET",
                credentials: "include"
            });

            if (response.ok) {
              console.log("Logout successful and cookie deleted");
              navigate('/')
          } else {
            //navigate('/login')
            console.error("Logout failed");
          }     

    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
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
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
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
      const response = await fetch('/api/update-logged-user-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstNameTemp,
          lastNameTemp,
          emailTemp
        }),
        credentials: "include"
      });
      
      if (response.ok) {
        console.log('Profile data saved successfully.');
      } else {
        console.error('Failed to save profile data.');
      }
    } catch (error) {
      console.error('Error while saving  data:', error);
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
    <div className="user-wrapper">
        <div className="user-header">
          <div className="left-content">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            style={{ color: '#18181A', marginRight:'0px'}}
            className="back-button"
          />
        </div>
        <div className="center-content" style={{textAlign:'center', flex:'2'}}>
          <p className="greeting" style={{margin:'0px'}}>Hello {firstName}!</p>
        </div>
      </div>
      <div className="user-main">
        <img src={profilePicture} alt="alt-text" />
        <p className="user-about-label" style={{  fontSize: '30px', fontWeight: 'bold'}}>About</p>
        <p className="user-name" style={{  fontSize: '30px',  fontWeight: '500', marginBottom: '0'}}>{firstName} {lastName}</p>
        <div className="user-email" style={{  fontSize: '25px', fontWeight: '400', padding: '0'}}>{email}</div>
        <Button variant="outlined" className="logout" onClick={handleLogout} style={{commonStyles, marginTop:'20px'}}>Logout</Button>
      </div>
      <div className="user-info">
        <div className="user-personal">
          <p className="user-personal__headline" style={{color: '#000', fontSize: '36px', fontStyle: 'normal' ,fontWeight: '700'}}>Personal info</p>
          <p className="user-data" style={{  padding: '0', margin: '10', fontSize: '20px'}}>
            <strong>First Name:</strong> {editingProfile ? (
              <TextField
                className="first-name"
                type="text"
                value={firstNameTemp}
                onChange={(e) => setFirstNameTemp(e.target.value)}
              />
            ) : (
              <span>{firstName}</span>
            )}
          </p>
          <p className="user-data" style={{  padding: '0', margin: '10', fontSize: '20px'}}>
            <strong>Last Name:</strong> {editingProfile ? (
              <TextField
                className="last-name"
                type="text"
                value={lastNameTemp}
                onChange={(e) => setLastNameTemp(e.target.value)}
              />
            ) : (
              <span>{lastName}</span>
            )}
          </p>
          <p className="user-data" style={{  padding: '0', margin: '10', fontSize: '20px'}}>
            <strong>Email:</strong> {editingProfile ? (
              <TextField
                className="email"
                type="email"
                value={emailTemp}
                onChange={(e) => setEmailTemp(e.target.value)}
              />
            ) : (
              <span>{email}</span>
            )}
          </p>
          {editingProfile && (
            <div className="edit-buttons">
              <Button variant="outlined" className="save-btn" style={{commonStyles, margin: '20px' }} onClick={handleSaveProfile}>Save</Button>
              <Button variant="outlined" className="cancel-btn" style={{commonStyles, margin: '20px' }}  onClick={handleCancelProfile}>Cancel</Button>
            </div>
          )}

          <div className="health-data">
              <p className="user-data" style={{  padding: '0', margin: '10', fontSize: '20px'}}>
                <strong>Birth Date:</strong> {editingHealthData ? (
                  <TextField
                    className="health-data-input"
                    type="date"
                    value={birthDateTemp}
                    onChange={(e) => setBirthDateTemp(e.target.value)}
                  />
                ) : (
                  <span>{birthDate}</span>
                )}
              </p>
              <p className="user-data" style={{  padding: '0', margin: '10', fontSize: '20px'}}>
                <strong>Height (cm):</strong> {editingHealthData ? (
                  <TextField
                    className="health-data-input"
                    type="number"
                    value={heightTemp}
                    onChange={(e) => setHeightTemp(e.target.value)}
                  />
                ) : (
                  <span>{height}</span>
                )}
              </p>
              <p className="user-data" style={{  padding: '0', margin: '10', fontSize: '20px'}}>
                <strong>Weight (kg):</strong> {editingHealthData ? (
                  <TextField
                    className="health-data-input"
                    type="number"
                    value={weightTemp}
                    onChange={(e) => setWeightTemp(e.target.value)}
                  />
                ) : (
                  <span>{weight}</span>
                )}
              </p>
              <p className="user-data" style={{  padding: '0', margin: '10', fontSize: '20px'}}>
                <strong>Gender:</strong> {editingHealthData ? (
                  <Select
                    className="health-data-input"
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
              <p className="user-data" style={{  padding: '0', margin: '10', fontSize: '20px'}}>
                <strong>Needs special assistance:</strong> {editingHealthData ? (
                  <Checkbox
                    className="health-data-input"
                    checked={needsSpecialAssistanceTemp}
                    onChange={(e) => setNeedsSpecialAssistanceTemp(e.target.checked)}
                  />
                ) : (
                  <span>{needsSpecialAssistance ? 'Yes' : 'No'}</span>
                )}
              </p>
              {editingHealthData && (
                <div className="edit-buttons">
                  <Button variant="outlined" className="save-btn" style={{commonStyles, margin: '20px' }}  onClick={handleSaveHealthData}>Save</Button>
                  <Button variant="outlined" className="cancel-btn" style={{commonStyles, margin: '20px' }}  onClick={handleCancelHealthData}>Cancel</Button>
                </div>
              )}
            </div>
        </div>
        <div className="user-actions">
          <div className="user-options" style={{ display: 'flex', flexDirection: 'column',  gap: '10px'}}>
            <p className="user-options-label" style={{color: '#000', fontSize: '36px', fontStyle: 'normal' ,fontWeight: '700', marginBottom:'10px'}}>Options</p>
            <Button variant="outlined" onClick={handleEditProfile} style={{color: '#000', fontFamily: 'Montserrat'}}>Edit personal info</Button>
            <Button variant="contained" onClick={handleEditHealthData} sx={{background: '#000'}} style={{color: '#FFF', fontFamily: 'Montserrat'}}>Edit health data</Button>
          </div>
          <div className="user-health">
            <p className="user-health-label" style={{color: '#000', fontSize: '36px', fontStyle: 'normal' ,fontWeight: '700'}}>Health data</p>
            <a href="#" onClick={handleHealthFormClick} style={{fontFamily: 'Montserrat', fontSize: '16px', fontStyle: 'normal', textDecoration:'none' }}>Access the health formular</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProf;
