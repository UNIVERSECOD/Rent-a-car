// import { v4 as uuidv4 } from "uuid";
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/rent".replace(/\\/g, '/'));
//   },
//   filename: function (req, file, cb) {
//     const fileExtension = file.originalname.split(".").pop();
//     const uniqueSuffix = uuidv4() + "." + fileExtension;
//     const fileName = "rent-" + uniqueSuffix;
//     cb(null, fileName);
//   },
// });

// export const upload = multer({ storage: storage });

import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure destination uses forward slashes
    cb(null, path.posix.join("public", "rent"));
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop();
    const uniqueSuffix = uuidv4() + "." + fileExtension;
    const fileName = "rent-" + uniqueSuffix;

    // Ensure the filename does not introduce backslashes
    cb(null, fileName);
  },
});

export const upload = multer({ storage: storage });

