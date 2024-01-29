import multer, { diskStorage } from "multer";
// save on local BE (./public/imgs)
const storage = multer({
    storage: diskStorage({
      destination: process.cwd() + "/public/imgs",
      filename: (req, file, cb) => {
        cb(null, new Date().getTime() + `_${file.originalname}` );
      },
    }),
  });

export default storage