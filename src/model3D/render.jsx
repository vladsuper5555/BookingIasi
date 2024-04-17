import React, { useState, useEffect } from "react";
import ReactPannellum from "react-pannellum";

const MainPage = () => {
    const [panoConfig, setPanoConfig] = useState({ imageSource: "", config: {} });

    const fetchPanoConfig = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/panoramas', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            setPanoConfig({
                imageSource: data.imageSource,
                config: data.config
            });
        } catch (error) {
            // additional error handling
            console.error("Failed to fetch panorama config:", error);
        }
    };

    useEffect(() => {
        fetchPanoConfig();
    }, []);

    ReactPannellum.addScene("Bathroom", {
        hfov: 130,
        pitch: 0,
        yaw: 0,
        type: "equirectangular",
        imageSource: "https://pannellum.org/images/alma.jpg"
    });
    // study API events: https://github.com/hoaiduyit/react-pannellum
    // use examples from here: https://codesandbox.io/p/sandbox/reactpannellum-example-cxhwzg?file=%2Fsrc%2FApp.js%3A191%2C26
    
    return (
        <div>
            <ReactPannellum
                imageSource={panoConfig.imageSource}
                key={panoConfig.imageSource}
                id="mainscene"
                sceneId="mainscene"
                config={panoConfig.config}
            >
            </ReactPannellum>
        </div>
    );
};

export default MainPage;
