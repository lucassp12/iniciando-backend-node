import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');
export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, cb) => {
      crypto.randomBytes(10, (err, res) => {
        if (err) return cb(err);
        const fileHash = res.toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;
        return cb(null, fileName);
      });
    },
  }),
};
