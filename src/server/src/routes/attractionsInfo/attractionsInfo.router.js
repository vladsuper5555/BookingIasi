import { Router } from 'express';
import { getHotelsNamesFromDatabase, getAttractionsForHotel, getAttractionsWithDirections } from './attractionsInfo.controller.js';

const attractionsRouter = new Router();

attractionsRouter.post('/attractions', getHotelsNamesFromDatabase);
attractionsRouter.post('/attractionshotel', getAttractionsForHotel);
attractionsRouter.post('/attractionshotelwithdirections', getAttractionsWithDirections);

export default attractionsRouter;