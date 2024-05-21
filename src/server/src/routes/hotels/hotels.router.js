import { Router } from 'express';
import { getHotelsNames} from './hotels.controller.js';

const hotelsRouter = new Router();

hotelsRouter.post('/hotelsnames', getHotelsNames);
hotelsRouter.post('/hotelsinfo', getInformationAboutHotel);

export default hotelsRouter;