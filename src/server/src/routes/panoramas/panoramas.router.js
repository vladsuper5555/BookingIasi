import { Router } from 'express';
import { getPanorama, updatePanorama } from './panoramas.controller';

const panoramasRouter = Router();

panoramasRouter.get('/panoramas', getPanorama);
panoramasRouter.put('/panoramas', updatePanorama);

export default panoramasRouter;