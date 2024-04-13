import { Router } from 'express';
import { getPanorama } from './panoramas.controller';

const panoramasRouter = Router();

panoramasRouter.post('/', getPanorama);

export default panoramasRouter;