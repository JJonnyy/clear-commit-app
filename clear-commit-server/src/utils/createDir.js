import fs from 'fs';
import path from 'path';

export const createDir = (dirname) => {
  const dirPath = path.join(process.cwd(), dirname);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, {recursive: true});
    console.log(`Создана директория: ${dirPath}`);
    return true;
  }
  console.log(`Директория уже существует: ${dirPath}`);
  return false;
}