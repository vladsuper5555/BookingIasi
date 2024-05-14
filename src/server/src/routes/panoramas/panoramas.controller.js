import rootShouldForwardProp from '@mui/material/styles/rootShouldForwardProp';
import {
    getPanorama,
    getPanoramaScene,
    uploadPanorama,
    updatePanoramaScene,
    getConfigDEMO // TO DELETE
} from '../../models/panoramas.model.js';

function getPanoramaDEMO(req, res) {
    res.status(200).json(getConfigDEMO());
}

async function httpGetPanorama(req, res) { // panoramas/?hotel=unirea&appType=app&appId=1&roomType=bedroom&fileType=panorama.json
    const hotel = req.query.hotel;
    const appType = req.query.appType;
    const appId = req.query.appId;
    const roomType = req.query.roomType;
    const fileType = req.query.fileType;

    console.log(hotel, appType, appId, roomType, fileType);

    try {
        const panorama = await getPanorama(hotel, appType, appId, roomType, fileType);
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
    await uploadPanorama(); // to do
}

async function httpUpdatePanoramaScene(req, res) {
    await updatePanoramaScene(); // to do
}

export {
    httpGetPanorama,
    httpGetPanoramaScene,
    httpUploadPanorama,
    httpUpdatePanoramaScene,
    getPanoramaDEMO // TO DELETE
};