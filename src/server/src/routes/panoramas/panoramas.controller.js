import {
    getPanorama,
    getPanoramaScene,
    uploadPanorama,
    updatePanoramaScene,
    getConfigDEMO // TO DELETE
} from '../../models/panoramas.model';

function getPanoramaDEMO(req, res) {
    res.status(200).json(getConfigDEMO());
}

function httpGetPanorama(req, res) { // panoramas/?hotel=1&room=2
    const hotel = req.query.hotel;
    const room = req.query.room;

    try {
        const panorama = getPanorama(hotel, room);
        res.status(200).json(panorama);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

function httpGetPanoramaScene(req, res) { // panoramas/(scene)4/?hotel=1&room=2
    const hotel = req.query.hotel;
    const room = req.query.room;
    const scene = req.params.sceneId;

    try {
        const panoramaScene = getPanoramaScene(hotel, room, scene);
        res.status(200).json(panoramaScene);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}

function httpUploadPanorama(req, res) {
    uploadPanorama(); // to do
}

function httpUpdatePanoramaScene(req, res) {
    updatePanoramaScene(); // to do
}

export {
    httpGetPanorama,
    httpGetPanoramaScene,
    httpUploadPanorama,
    httpUpdatePanoramaScene,
    getPanoramaDEMO // TO DELETE
};