import multer from "multer";

// Configure Multer for file upload
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
export const upload = multer({ storage: storage });
