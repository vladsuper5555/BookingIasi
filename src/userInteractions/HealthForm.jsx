// HealthForm.jsx
import React, { useEffect, useState } from 'react';
import './UserProf.css'; // Importăm stilurile din UserProf.css
import { useNavigate } from 'react-router-dom';
function HealthForm() {
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Other');
  const [needsSpecialAssistance, setNeedsSpecialAssistance] = useState(false);

//redirect to userProf?
  const navigate = useNavigate();
  //we need a smarter way for this, right now you can't access it at all 
  /* useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5173/api/check-auth', {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          navigate('/userProf');
        }else{
          navigate('/login');
        }
      } catch (error) {
        console.error("An error occurred while checking authentication:", error);
      }
    };

    checkAuth();
  }, [navigate]); */
  
  const handleSaveHealthData = () => {
    // Aici poți adăuga logica pentru salvarea datelor în baza de date
    console.log('Saving health data...');
    console.log({
      birthDate,
      height,
      weight,
      gender,
      needsSpecialAssistance,
    });
  };

  return (
    <div className="health-form-container"> {/* Folosim clasa "health-form-container" din UserProf.css */}
      <div className="info-item">
        <h2 className="input-label">Birth Date:</h2>
        <input
          className="health-data-input"
          type="date"
          id="Birth_Date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <h2 className="input-label">Height (cm):</h2>
        <input
          className="health-data-input"
          type="text"
          id="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <h2 className="input-label">Weight (kg):</h2>
        <input
          className="health-data-input"
          type="text"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <h2 className="input-label">Gender:</h2>
        <select
          className="health-data-input"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <h2 className="input-label">Needs Special Assistance:</h2>
        <input
          className="health-data-input"
          type="checkbox"
          id="Special_Assistance"
          checked={needsSpecialAssistance}
          onChange={(e) => setNeedsSpecialAssistance(e.target.checked)}
        />
      </div>
      <div className="info-divider"></div>
      <div className="health-data-buttons">
        <button className="save-btn" id = "save-btn" onClick={handleSaveHealthData}>Save</button>
      </div>
    </div>
  );
}

export default HealthForm;
