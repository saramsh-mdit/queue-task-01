import multer from "multer";
import path from "path";

const fileToSavePath = path.join(process.cwd(), "/public");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileToSavePath);
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".")[1] || "";
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${extension}`;
    cb(null, uniqueSuffix);
  },
});

export const fileUpload = multer({ storage: storage });
