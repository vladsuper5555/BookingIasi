import { Router } from 'express';
import { getUserActivityIndex, getHotelsNamesFromDatabase, getAttractionsForHotel, getAttractionsWithDirections,getHotelIdByName } from './attractionsInfo.controller.js';

const attractionsRouter = new Router();

attractionsRouter.post('/attractions', getHotelsNamesFromDatabase);
attractionsRouter.post('/attractionshotel', getAttractionsForHotel);
attractionsRouter.post('/attractionshotelwithdirections', getAttractionsWithDirections);
attractionsRouter.post('/attractionsbyid', getHotelIdByName);
attractionsRouter.post ('/useractivityindex', getUserActivityIndex);

export default attractionsRouter;