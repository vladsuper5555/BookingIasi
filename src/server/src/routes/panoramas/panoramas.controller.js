import {
    getPanorama,
    getPanoramaScene,
    uploadPanorama,
    updatePanoramaScene,
} from '../../models/panoramas.model.js';

async function httpGetPanorama(req, res) { // panoramas/?hotel=FII&appType=Apps&appId=App1&roomType=Rooms
    const hotel = req.query.hotel;
    const appType = req.query.appType;
    const appId = req.query.appId;
    const roomType = req.query.roomType;

    try {
        console.log('httpGetPanorama');
        console.log(hotel, appType, appId, roomType);
        const panorama = await getPanorama(hotel, appType, appId, roomType);
        return res.status(200).json(panorama);
    } catch (error) {
        if (error.message === 'Panorama not found') {
            res.status(404).json({
                message: error.message
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}

async function httpGetPanoramaScene(req, res) { // panoramas/(scene)4/?hotel=1&room=2
    const hotel = req.query.hotel;
    const room = req.query.room;
    const scene = req.params.sceneId;

    try {
        const panoramaScene = await getPanoramaScene(hotel, room, scene);
        res.status(200).json(panoramaScene);
    } catch (error) {
        if (error.message === 'Scene not found') {
            res.status(404).json({
                message: error.message
            });
        }
        else {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
}

async function httpUploadPanorama(req, res) {
    await uploadPanorama();
}

async function httpUpdatePanoramaScene(req, res) {
    await updatePanoramaScene(); // to do
}

export {
    httpGetPanorama,
    httpGetPanoramaScene,
    httpUploadPanorama,
    httpUpdatePanoramaScene
};