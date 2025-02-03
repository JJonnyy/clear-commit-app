import multer from 'multer';
import path from 'path';

// Настройка multer для сохранения файлов с оригинальным именем
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Папка, куда сохранять файлы
  },
  filename: (req, file, cb) => {
    // Генерируем уникальное имя файла
    const uniqueSuffix = '_' + Math.round(Math.random() * 1e8);
    // Сохраняем оригинальное имя файла, добавляя уникальный суффикс
    const originalName = path.parse(file.originalname).name; // Получаем имя файла без расширения
    const extension = path.extname(file.originalname); // Получаем расширение файла
    cb(null, `${originalName}_${uniqueSuffix}${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/css') {
    cb(null, true); // Принимаем файл
  } else {
    cb(new Error('Разрешены только файлы .css'), false); // Отклоняем файл
  }
};


// Настройка multer для загрузки файлов
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 } // 1024 * 1024 limits: Ограничение: 1 МБ
});
