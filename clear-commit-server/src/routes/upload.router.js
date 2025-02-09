import { Router } from 'express';
import { upload } from '../config/multer.config.js';
import { uploadFile, handleUploadError } from '../controllers/upload.controller.js';

const router = Router();

router.post('/', upload.single('file'), handleUploadError, uploadFile);

export default router;