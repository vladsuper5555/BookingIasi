// ModelPage.js

import React from 'react';
import PanoramaTour from './render';
import './PanoramaTour.css'; // Import the CSS file


const ModelPage = () => {
  return (
    <div class="whole_page">
      <h1>Virtual Hotel Tour</h1>
      <div className="panoramaTour">
        <PanoramaTour/>
      </div>
    </div>
  );
};

export default ModelPage;
