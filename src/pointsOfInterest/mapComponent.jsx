import { LanOutlined, Language } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import mapStyle from "./map.module.css";

const apiKey = "AIzaSyB66hTrBl9RqFQsBqzwbCcBtVECWaqHrkE";

const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${url}&language=en`; // Add language parameter to the URL
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
};

function MapComponent({ query }) {
  useEffect(() => {
    const initMap = () => {
      if (typeof google === 'undefined') {
        console.error('Error: Google Maps API not loaded.');
        return;
      }

      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 20,
        language: 'en'
      });

      const placesService = new google.maps.places.PlacesService(map);

      const request = {
        language: 'en',
        query: query,
        // fields: ['name', 'geometry']
      };

      placesService.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          const firstPlace = results[0];
          map.setCenter(firstPlace.geometry.location);

          const requestNearby = {
            language: 'en',
            location: firstPlace.geometry.location,
            radius: '1500'
          };

          placesService.nearbySearch(requestNearby, (resultsNearby, statusNearby) => {
            if (statusNearby === google.maps.places.PlacesServiceStatus.OK) {
              for (let i = 0; i < resultsNearby.length; i++) {
                const placeNearby = resultsNearby[i];
                console.log(placeNearby.name, placeNearby.geometry.location);
              }
            } else {
              console.error('Nearby search request failed:', statusNearby);
            }
          });
        } else {
          console.error('Text search request failed:', status);
        }
      });
    };

    loadScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`)
      .then(initMap)
      .catch((error) => {
        console.error('Error loading Google Maps API:', error);
      });

  }, [query]);

  return (
    <div>
      <div id="map" className={mapStyle["map-style"]}></div>
    </div>
  );
}

export default MapComponent;
