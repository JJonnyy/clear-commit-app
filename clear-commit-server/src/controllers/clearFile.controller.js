import fs from "fs/promises";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const ALLOWED_EXTENSIONS = ['.css'];


const isSafePath = (fileName) => {
  const resolvedPath = path.resolve(UPLOADS_DIR, fileName);
  return resolvedPath.startsWith(UPLOADS_DIR);
};


const processFile = async (filePath) => {
  const content = await fs.readFile(filePath, 'utf8')


  const cleanedContent = content.replace(/\{[^}]*\}/gs, (block) => {
    return block.replace(/\/\*.*?\*\//gs, '');
  });

  const finalContent = cleanedContent
      .split('\n')
      .filter(line => line.trim() !== '')
      .join('\n');

  return finalContent;
};

const generateUniqueFilename = (originalName) => {
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext);

  return `${name}_clear${ext}`;
};

export const clearFile = async (req, res) => {
  try {
    const {fileName} = req.body;

    if (!fileName) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    if (!isSafePath(fileName)) {
      return res.status(403).json({ error: 'Invalid file path' });
    }
    const fileExt = path.extname(fileName).toLowerCase();
    if(!ALLOWED_EXTENSIONS.includes(fileExt)){
      return res.status(415).json({ error: 'Unsupported file type' });
    }

    const filePath = path.join(UPLOADS_DIR, fileName);
    try {
      await fs.access(filePath, fs.constants.F_OK);
    } catch {
      return res.status(404).json({ error: 'File not found' });
    }

    const cleanedContent = await processFile(filePath);

    const newFileName = generateUniqueFilename(fileName);

    const clearFilePath = path.join(UPLOADS_DIR, 'clears', newFileName);
    await fs.writeFile(clearFilePath, cleanedContent);

    res.json({
      success: true,
      fileName: newFileName,
      path: `uploads/clears/${newFileName}`,
      size: cleanedContent.length
    });
  }catch (error){
    console.error('error:', error);
    const status = error.code === 'ENOENT' ? 404 : 500;
    res.status(status).json({
      error: error.code === 'ENOENT'
        ? 'File not found'
        : 'Internal server error'
    });
  }
};