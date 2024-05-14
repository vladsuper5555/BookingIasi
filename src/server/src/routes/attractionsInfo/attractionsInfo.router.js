import { Router } from 'express';
import { getHotelsNamesFromDatabase, getAttractionsForHotel } from './attractionsInfo.controller.js';

const attractionsRouter = new Router();

attractionsRouter.post('/attractions', getHotelsNamesFromDatabase);
attractionsRouter.post('/attractionshotel', getAttractionsForHotel);

export default attractionsRouter;