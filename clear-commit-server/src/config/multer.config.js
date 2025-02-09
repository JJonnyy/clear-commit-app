import multer from 'multer';
import path from 'path';

// Settings for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = '_' + Math.round(Math.random() * 1e8);

    const originalName = path.parse(file.originalname).name; // Get the file name without extension
    const extension = path.extname(file.originalname); // Get the file extension
    cb(null, `${originalName}_${uniqueSuffix}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/css') {
    cb(null, true);
  } else {
    cb(new Error('Allow files only .css'), false);
  }
};


// Settings multer for upload files
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 } // 1024 * 1024 limits: 1MB
});
