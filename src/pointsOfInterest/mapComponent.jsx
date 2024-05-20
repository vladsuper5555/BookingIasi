import React, { useEffect, useState } from 'react';

const apiKey = "AIzaSyB66hTrBl9RqFQsBqzwbCcBtVECWaqHrkE";

const parseURL = (url) => {
    const parsedUrl = new URL(url);
    const pathnameSegments = parsedUrl.pathname.split('/');
    let lastSegment = pathnameSegments[pathnameSegments.length - 1] || pathnameSegments[pathnameSegments.length - 2];
    lastSegment = decodeURIComponent(lastSegment); 
    const params = Object.fromEntries(parsedUrl.searchParams.entries());
    for (const key in params) {
        params[key] = decodeURIComponent(params[key]); 
    }
    return {
        lastPathSegment: lastSegment,
        params: params,
    };
};

function MapComponent() {
    const [urlData, setUrlData] = useState(null);

    useEffect(() => {
        const currentUrl = window.location.href;
        const parsedData = parseURL(currentUrl);
        setUrlData(parsedData);
        console.log('Parsed URL:', parsedData);

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
                initMap(parsedData);
            })
            .catch((error) => {
                console.error('Error loading Google Maps API:', error);
            });
    }, []);

    // Initialize the map
    function initMap(urlData) {
        if (typeof google === 'undefined') {
            console.error('Error: Google Maps API not loaded.');
            return;
        }

        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17
        });

        const placesService = new google.maps.places.PlacesService(map);

        const request = {
            query: urlData.lastPathSegment, 
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
        <div>
            <div id="map" style={{ height: '400px' }}></div>
        </div>
    );
}

export default MapComponent;