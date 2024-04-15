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

    return (
        <div>
            <ReactPannellum
                key={panoConfig.imageSource}
                id="panorama"
                sceneId="firstScene"
                imageSource={panoConfig.imageSource}
                config={panoConfig.config}
            >
            </ReactPannellum>
        </div>
    );
};

export default MainPage;
