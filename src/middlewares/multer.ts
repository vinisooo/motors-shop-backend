import { Request } from "express";
import multer, { StorageEngine } from "multer";

interface MulterFile extends Express.Multer.File {}

const storage: StorageEngine = multer.diskStorage({
  filename: function (req: Request, file: MulterFile, cb: (error: Error | null, filename: string) => void) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

export default upload;