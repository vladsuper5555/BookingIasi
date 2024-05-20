import { Router } from 'express';
import { getHotelsNames} from './hotels.controller.js';

const hotelsRouter = new Router();

hotelsRouter.post('/hotels', getHotelsNames);


export default hotelsRouter;