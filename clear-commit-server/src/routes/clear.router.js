import { Router } from 'express';
import { clearFile } from '../controllers/clearFile.controller.js';

const router = Router();

router.post('/', clearFile);

export default router;