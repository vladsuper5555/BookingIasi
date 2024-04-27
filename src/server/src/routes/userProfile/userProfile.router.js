import { Router } from 'express';
import {
    checkCredentialsAgainstDatabase,
    addCredentialsToDatabase,
} from './userProfile.controller.js';

const userProfileRouter = new Router();

userProfileRouter.post('/login', checkCredentialsAgainstDatabase);
userProfileRouter.post('/signup', addCredentialsToDatabase);

export default userProfileRouter;