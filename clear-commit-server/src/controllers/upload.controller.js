export const uploadFile = (req, res) => {
  // if (!req.file) {
  //   return res.status(400).json({ error: 'No file uploaded' });
  // }
  // проверка if (!req.file) избыточна, так как Multer уже гарантирует наличие файла при успешной загрузке

  res.json({
    success: true,
    filename: req.file.filename,
    size: req.file.size,
  });
};

export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err.message.includes('Allowed only')) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};