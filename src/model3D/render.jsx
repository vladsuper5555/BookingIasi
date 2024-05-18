import React, { useState, useEffect } from "react";
import ReactPannellum from "react-pannellum";

const MainPage = () => {
    const [panoConfig, setPanoConfig] = useState({ imageSource: "", config: {} });
    const [viewer, setViewer] = useState(null);
    const fetchPanoConfig = async () => {

        try {
            const response = await fetch('http://localhost:5173/api/panoramas/?hotel=FII&appType=Apps&appId=App1&roomType=Rooms', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const panoramas = await response.json();
            console.log(panoramas);
            panoramas.forEach(myFunction)
  
        } catch (error) {
            // additional error handling
            console.error("Failed to fetch panorama config:", error);
        }
    };

    const fetchPanoScene = async () => {
        try {
            setPanoConfig({
                imageSource: pano2.imageSource,
                config: pano2.config
            });
        } catch (error) {
            // additional error handling
            console.error("Failed to fetch panorama config:", error);
        }
    };


    useEffect(() => {
        fetchPanoConfig();
    }, []);

    const handleViewerLoad = (viewerInstance) => {
        setViewer(viewerInstance);
    };

    function myFunction(item, index) { 

        //setting the initial panorama
        if (item.sceneId === "Start") {
            setPanoConfig({
                imageSource: item.url,
                config: item.pinPoints
            });
        }

    }


    ReactPannellum.addScene("Room2", {
        hfov: 130,
        pitch: 0,
        yaw: 0,
        type: "equirectangular",
        "autoRotate": -3,
        "title": "Classroom View",
        showControls: false,
        imageSource: "https://pannellum.org/images/alma.jpg",
        hotSpots: [
            {
                "pitch": 1.1,
                "yaw": 90,
                "type": "info",
                "text": "Bogdanel View",
                "sceneId": "Start"
            },
        ]
    });


    // study API events: https://github.com/hoaiduyit/react-pannellum
    // use examples from here: https://codesandbox.io/p/sandbox/reactpannellum-example-cxhwzg?file=%2Fsrc%2FApp.js%3A191%2C26

    return (
        <div className="render">
            <ReactPannellum
                imageSource={panoConfig.imageSource}
                key={panoConfig.imageSource}
                id="mainscene"
                sceneId="Start"
                config={panoConfig.config}
                onLoad={(viewer) => handleViewerLoad(viewer)}
            >
            </ReactPannellum>
        </div>
    );
};

export default MainPage;
