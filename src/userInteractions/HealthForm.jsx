// HealthForm.jsx
import React, { useState } from 'react';
import './UserProf.css'; // Importăm stilurile din UserProf.css

function HealthForm() {
  const [birthDate, setBirthDate] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Other');
  const [needsSpecialAssistance, setNeedsSpecialAssistance] = useState(false);

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
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="info-divider"></div>
      <div className="info-item">
        <h2 className="input-label">Gender:</h2>
        <select
          className="health-data-input"
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
          checked={needsSpecialAssistance}
          onChange={(e) => setNeedsSpecialAssistance(e.target.checked)}
        />
      </div>
      <div className="info-divider"></div>
      <div className="health-data-buttons">
        <button className="save-btn" onClick={handleSaveHealthData}>Save</button>
      </div>
    </div>
  );
}

export default HealthForm;
