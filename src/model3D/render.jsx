import React from "react";
import ReactPannellum, { getConfig } from "react-pannellum";
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        // this.state can be removed
        this.state = {
            config: {
                imageSource: "", // This will be updated after fetching
            },
        };
    }

    fetchImage = async (imagePath) => {
        const ask = `{"imagePath":"${imagePath}"}`;
        const response = await fetch(`http://localhost:5173/api`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: ask,
        });
        const data = await response.json();
        return data;
    };

    componentDidMount() {
        const fetchData = async () => {
            const URLparse = new URL(window.location.href);
            const imagePath = URLparse.searchParams.get('hotel');
            if (imagePath) { // Make sure imagePath is not null
                const data = await this.fetchImage(imagePath);
                if (data.options) {
                    this.setState({
                        config: {
                            ...this.state.config,
                            hotSpotDebug: true,
                            imageSource: data.options.panorama,
                        }
                    });
                }
            }
        };
        fetchData();
    }

    render() {
        const { config } = this.state;
        console.log(config);
        return (
            <div>
                <ReactPannellum
                    key={config.imageSource}
                    id="panorama"
                    sceneId="firstScene"
                    imageSource={config.imageSource}
                    config={{
                        autoRotate: -2,
                        hotSpotDebug: 'true',
                        hotSpots: [
                            {
                                "pitch": 14.1,
                                "yaw": 1.5,
                                "type": "info",
                                "text": "Baltimore Museum of Art",
                                'clickHandlerFunc': (e) => { console.log(e) }
                            },
                            {
                                "pitch": -9.4,
                                "yaw": 222.6,
                                "type": "info",
                                "text": "Art Museum Drive"
                            },
                            {
                                "pitch": -0.9,
                                "yaw": 144.4,
                                "type": "info",
                                "text": "North Charles Street"
                            }
                        ]
                    }}
                />
                <div onClick={(e) => console.log(getConfig())}>Click me</div>
            </div>
        );
    }
}

export default MainPage;
