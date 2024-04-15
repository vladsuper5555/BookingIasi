import { getConfig, updateConfig } from '../../models/panoramas.model';

function getPanorama(req, res) {
    res.status(200).json(getConfig());
}

function updatePanorama(req, res) {
    const newConfig = req.body;
    updateConfig(newConfig);
    res.status(200).json({ message: "Panorama updated!" });
}

export {
    getPanorama,
    updatePanorama
};