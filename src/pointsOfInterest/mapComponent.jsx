// MapComponent.jsx

import React, { useEffect } from 'react';

const apiKey = "AIzaSyB66hTrBl9RqFQsBqzwbCcBtVECWaqHrkE";

function MapComponent() {
    useEffect(() => {
        function loadScript() {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            document.body.appendChild(script);
            return new Promise((resolve, reject) => {
                script.onload = resolve;
                script.onerror = reject;
            });
        }

        loadScript()
            .then(() => {
                initMap();
            })
            .catch((error) => {
                console.error('Error loading Google Maps API:', error);
            });
    }, []); 

    function initMap() {
        if (typeof google === 'undefined') {
            console.error('Error: Google Maps API not loaded.');
            return;
        }

        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 46.643461716274906, lng: 27.73332159484119 },
            zoom: 15
        });

        var placesService = new google.maps.places.PlacesService(map);

        var request = {
            location: map.getCenter(),
            radius: '1500',
            type: 'restaurant'
        }

        placesService.nearbySearch(request, callback);

        function callback(results, status, pagination) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    var place = results[i];
                    console.log(place.name, place.geometry.location);
                }
            }

            if (pagination.hasNextPage) {
                pagination.nextPage();
            }
        }
    }

    return (
        <div id="map" style={{ height: '400px' }}></div>
    );
}

export default MapComponent;
