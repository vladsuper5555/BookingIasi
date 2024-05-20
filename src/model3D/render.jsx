import React, { useState, useEffect } from "react";
import ReactPannellum from "react-pannellum";

const MainPage = () => {
    const [panoConfig, setPanoConfig] = useState({ imageSource: "", config: {} });
    const [viewer, setViewer] = useState(null);
    const [panoramas, setPanoramas] = useState([]);

    const fetchPanoConfig = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/panoramas/?hotel=Unirea&appType=ConferenceRoom&appId=Apartment1', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const panoramas = await response.json();
            panoramas.forEach(addInitialPanorama);
            setPanoramas(panoramas);
            console.log(panoramas);

        } catch (error) {
            console.error("Failed to fetch panorama config:", error);
        }
    };

    useEffect(() => {
        
        fetchPanoConfig();
    }, []);

    useEffect(() => {
        handleViewerLoad();
        if (viewer) {
            console.log("Viewer is loaded, adding scenes");
            if (panoramas.length > 0) {
                console.log("Panoramas array is not empty, adding scenes");
                panoramas.forEach(addScenes);
            } else {
                console.log("Panoramas array is empty, not adding scenes");
            }
        } else {
            console.log("Viewer is not loaded, not adding scenes");
        }
    }, [viewer, panoramas]);

    const handleViewerLoad = () => {
        const viewer = ReactPannellum.getViewer();
        if (viewer) {
            setViewer(viewer);
        } else {
            console.log("Viewer is not loaded");
        }
    };
    const addInitialPanorama = (item) => {
        if (item.sceneId === "Start") {
            setPanoConfig({
                imageSource: item.url,
                config: item.config
            });
        }
    };

    const addScenes = (item) => {

        console.log("Enters addScenes");

        if (viewer && item.sceneId !== "Start") {
            ReactPannellum.addScene(item.sceneId, {
                hfov: 130,
                pitch: 0,
                yaw: 0,
                type: "equirectangular",
                autoRotate: -3,
                title: item.config.title || "Untitled Scene",
                imageSource: item.config.imageSource,
                showControls: false,
                hotSpots: item.config.hotSpots || []
            });
        }
    };


    return (
        <div className="render">
            <ReactPannellum
                imageSource={panoConfig.imageSource}
                key={panoConfig.imageSource}
                id="mainscene"
                sceneId="Start"
                config={panoConfig.config}
                onScenechange={handleViewerLoad}
            />
        </div>
    );
};

export default MainPage;
