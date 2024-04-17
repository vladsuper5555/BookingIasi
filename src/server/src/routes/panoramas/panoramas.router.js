import { Router } from 'express';
import {
    httpGetPanorama,
    httpGetPanoramaScene,
    httpUploadPanorama,
    httpUpdatePanoramaScene,
    getPanoramaDEMO // TO DELETE
} from './panoramas.controller';

const panoramasRouter = Router();

panoramasRouter.get('/panoramas', getPanoramaDEMO);
//panoramasRouter.get('/panoramas', httpGetPanorama);
panoramasRouter.get('/panoramas/:sceneId', httpGetPanoramaScene);
panoramasRouter.post('/panoramas', httpUploadPanorama); // middleware authentication/authorize admin
panoramasRouter.put('/panoramas/:sceneId', httpUpdatePanoramaScene);  // middleware authentication/authorize admin

export default panoramasRouter;