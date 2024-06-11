import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate} from 'react-router-dom';
function HealthForm() {
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Other');
  const [needsSpecialAssistance, setNeedsSpecialAssistance] = useState(false);
  const [walkFrequency, setWalkFrequency] = useState(''); 
  const [walkDistance, setWalkDistance] = useState(''); 
  const [sportsPracticed, setSportsPracticed] = useState([]); 
  const [sportsFrequency, setSportsFrequency] = useState({}); 
  const [sportsIntensity, setSportsIntensity] = useState({}); 
  const navigate = useNavigate();
  
  const commonStyles = {
    fontFamily: 'Montserrat, sans-serif',
    color: '#18181A'
  };
  const labelStyles = {
    ...commonStyles,
    fontSize: '20px',
    fontWeight: 'bold'
  };

  const handleSaveHealthData = async () => {
    console.log('Saving health data...');
    let activityIndex = 0;
  
    // punctele pentru mers pe jos
    if (walkFrequency && walkDistance) {
      const walkPoints = parseInt(walkFrequency) * parseInt(walkDistance);
      activityIndex += walkPoints * 2;
    }
  
    // punctele pentru sport
    sportsPracticed.forEach(sport => {
      const frequencyPoints = {
        'Less than once a week': 1,
        '1-2': 3,
        '3-5': 5,
        '6-7': 7
      };
      const intensityPoints = {
        'Low': 1,
        'Medium': 3,
        'High': 5
      };
      const sportFrequency = sportsFrequency[sport];
      const sportIntensity = sportsIntensity[sport];
      if (sportFrequency && sportIntensity) {
        // punctele pe activitate
        let pointsForSport = 2;
        
        if (sport !== 'swimming' && sport !== 'something else' &&  sport !== 'running' &&  sport !== 'going to gym' ) {
          pointsForSport = 3;
        }
        const frequencyValue = frequencyPoints[sportFrequency];
        const intensityValue = intensityPoints[sportIntensity];
        activityIndex += pointsForSport * frequencyValue * intensityValue;
      }
    });
  
    activityIndex = Math.min(activityIndex, 100);
  
    console.log('Activity Index:', activityIndex);
    ///mai trebuie un checkCookie call
    try {
      const response = await fetch('/users/saveHealthForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          birthDate,
          height,
          weight,
          gender,
          needsSpecialAssistance,
         // cred ca lipseste 
        // userAgreedToFetchData,
          activityIndex
        }),
        credentials: "include"
      });
      
      if (response.ok) {
        console.log('Health data saved successfully.');
        navigate('/attractions');
      } else {
        console.error('Failed to save health data.');
      }
    } catch (error) {
      console.error('Error while saving health data:', error);
    }
  };

  const handleSportSelection = (sport) => {
    if (sportsPracticed.includes(sport)) {
      const updatedSports = sportsPracticed.filter(item => item !== sport);
      setSportsPracticed(updatedSports);
    } else {
      setSportsPracticed([...sportsPracticed, sport]);
      setSportsFrequency({...sportsFrequency, [sport]: ''});
      setSportsIntensity({...sportsIntensity, [sport]: ''});
    }
  };

  return (
    <div className="health-form-container" style={{ commonStyles, backgroundColor: '#fff', padding: '80px', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', margin: '180px', marginTop: '40px',position: 'relative' }}> 
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)} 
        style={{ position: 'absolute', top: '30px', left: '10px', color: '#18181A', width:' 30.01px' }}
      >
      </Button>
      
      <div style={{ marginTop: '60px', textAlign:'start' }}> 
        <h1 style={{ ...commonStyles, fontSize: '48px', fontWeight: 'bold' }}>Health Formular</h1>
      </div>
      <div className="line" style={{maxWidth: '1430px',height:' 1px', background: 'rgba(0, 0, 0, 0.40)'}}></div>
      <div className='section' style={{marginTop:'20px'}}>
      <h2 style={{ ...commonStyles, fontSize: '24px', fontWeight: 'bold' , textAlign:'start'}}>General Info</h2>
      <div className="info-item" style={{marginLeft:'30%', marginBottom:'30px'}}>
        <InputLabel className="input-label" style={labelStyles}>Birth Date:</InputLabel>
        <TextField
          className="health-data-input"
          type="date"
          id="Birth_Date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={commonStyles}
        />
      </div>
      <div className="info-item" style={{marginLeft:'30%', marginBottom:'30px'}}> 
        <InputLabel className="input-label" style={labelStyles}>Height (cm):</InputLabel>
        <TextField
          className="health-data-input"
          type="text"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          style={commonStyles}
        />
      </div>
      <div className="info-item" style={{marginLeft:'30%', marginBottom:'30px'}}>
        <InputLabel className="input-label" style={labelStyles}>Weight (kg):</InputLabel>
        <TextField
          className="health-data-input"
          type="text"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={commonStyles}
        />
      </div>
      <div className="info-item" style={{marginLeft:'30%', marginBottom:'30px'}}>
        <InputLabel className="input-label" style={labelStyles}>Gender:</InputLabel>
        <Select
          className="health-data-input"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={commonStyles}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </div>
      <div className="info-item" style={{marginLeft:'30%', marginBottom:'30px'}}>
        <InputLabel className='input-laber' style={labelStyles}>Needs Special Assistance:</InputLabel>
        <FormControlLabel
          control={<Checkbox checked={needsSpecialAssistance} onChange={(e) => setNeedsSpecialAssistance(e.target.checked)} />}
          id = "Special_Assistance"
          style={commonStyles}
        />
      </div>
      </div>
      <div className="line" style={{maxWidth: '1430px',height:' 1px', background: 'rgba(0, 0, 0, 0.40)'}}></div>
      <div className='section' style={{marginTop:'20px'}}>
      <h2 style={{ ...commonStyles, fontSize: '24px', fontWeight: 'bold' , textAlign:'start'}}>Physical Activity</h2>
      <div className="info-item" style={{marginLeft:'30%', marginBottom:'30px'}}>
        <InputLabel className="input-label" style={labelStyles}>How often do you walk?</InputLabel>
        <Select
          className="health-data-input"
          value={walkFrequency}
          id = "walkFrequency"
          onChange={(e) => setWalkFrequency(e.target.value)}
          style={commonStyles}
        >
          <MenuItem value="">Select frequency</MenuItem>
          <MenuItem value="1">1 day a week</MenuItem>
          <MenuItem value="2">2 days a week</MenuItem>
          <MenuItem value="3">3 days a week</MenuItem>
          <MenuItem value="4">4 days a week</MenuItem>
          <MenuItem value="5">5 days a week</MenuItem>
          <MenuItem value="6">6 days a week</MenuItem>
          <MenuItem value="7">7 days a week</MenuItem>
        </Select>
      </div>
      <div className="info-item" style={{marginLeft:'30%', marginBottom:'30px'}}>
        <InputLabel className="input-label" style={labelStyles}>The average distance of the walk (km):</InputLabel>
        <TextField
          className="health-data-input"
          type="text"
          id = "walkDistance"
          value={walkDistance}
          onChange={(e) => setWalkDistance(e.target.value)}
          style={commonStyles}
        />
      </div>

      <div className="info-item" style={{marginLeft:'30%', marginBottom:'30px'}}>
        <InputLabel className="input-label" style={labelStyles}>Do you practice any sports?</InputLabel>
      </div>
      <div className="info-item" style={{marginLeft:'30%', marginBottom:'30px'}}>
        <div className="sports-container">
          {['running', 'football', 'basketball', 'tennis', 'volleyball', 'handball', 'swimming', 'going to the gym', 'something else'].map((sport) => (
            <div key={sport} className="sport-item">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <FormControlLabel
                  control={<Checkbox checked={sportsPracticed.includes(sport)} onChange={() => handleSportSelection(sport)} />}
                  id={`${sport}`}
                  label={sport}
                  style={commonStyles}
                />
                {sportsPracticed.includes(sport) && (
                  <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column' }}>
                    <InputLabel className="input-label" style={commonStyles}>Frequency:</InputLabel>
                    <Select
                      className="health-data-input"
                      value={sportsFrequency[sport]}
                      id={`${sport}_frequency`}
                      onChange={(e) => setSportsFrequency({...sportsFrequency, [sport]: e.target.value})}
                      style={commonStyles}
                    >
                      <MenuItem value="">Select frequency</MenuItem>
                      <MenuItem value="Less than once a week">Less than once a week</MenuItem>
                      <MenuItem value="1-2">1-2 times a week</MenuItem>
                      <MenuItem value="3-5">3-5 times a week</MenuItem>
                      <MenuItem value="6-7">6-7 times a week</MenuItem>
                    </Select>
                    <InputLabel className="input-label" style={commonStyles}>Intensity:</InputLabel>
                    <Select
                      className="health-data-input"
                      value={sportsIntensity[sport]}
                      onChange={(e) => setSportsIntensity({...sportsIntensity, [sport]: e.target.value})}
                      style={commonStyles}
                    >
                      <MenuItem value="">Select intensity</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      <div className="line" style={{maxWidth: '1430px',height:' 1px', background: 'rgba(0, 0, 0, 0.40)'}}></div>
      <div className="health-data-buttons">
        <Button variant="outlined" className="save-btn" id="save-btn" style={commonStyles} onClick={handleSaveHealthData}>Save</Button>
      </div>
    </div>
  );
} 

export default HealthForm;
