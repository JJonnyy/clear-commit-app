import {Router} from "express";
import * as authenticationController from "./authentication.controller.js";

const router = Router();
router.post('/signin', authenticationController.signIn);
router.post('/signup', authenticationController.signUp);
router.get('/check-auth', authenticationController.checkAuth);
router.post('/logout', authenticationController.logout);

export default router;