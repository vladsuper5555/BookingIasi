import { Router } from 'express';
import { getHotelsNamesFromDatabase,getInformationAboutHotel} from './hotels.controller.js';

const hotelsRouter = new Router();

hotelsRouter.post('/hotelsnames', getHotelsNamesFromDatabase);
hotelsRouter.post('/hotelsinfo', getInformationAboutHotel);

export default hotelsRouter;