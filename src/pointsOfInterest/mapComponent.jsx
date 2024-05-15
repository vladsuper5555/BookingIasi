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

        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15
        });

        const placesService = new google.maps.places.PlacesService(map);

        const request = {
            query: 'Gara Iasi', 
            fields: ['name', 'geometry']
        };

        placesService.textSearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                const firstPlace = results[0];
                map.setCenter(firstPlace.geometry.location);

                const requestNearby = {
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
    }

    return (
        <div id="map" style={{ height: '400px' }}></div>
    );
}

export default MapComponent;
