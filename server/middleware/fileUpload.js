// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // unique filename
//   },
// });

// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed!"));
//   }
// };

// export const uploadImage = (fieldName = "image", maxSizeMB = 2) => {
//   const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1024 * 1024 * maxSizeMB },
//     fileFilter: fileFilter,
//   });
//   return upload.single(fieldName);
// };

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

// Dynamic uploader
export const uploadImage = ({
  fieldName = "image",
  maxSizeMB = 2,
  multiple = false,
  maxCount = 5,
} = {}) => {
  const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * maxSizeMB },
    fileFilter,
  });

  // Choose the appropriate multer method based on `multiple`
  return multiple
    ? upload.array(fieldName, maxCount)
    : upload.single(fieldName);
};




// app.post("/upload", upload.single('image'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({
//       success: false,
//       message: "No file uploaded",
//     });
//   }
//   const filePath = req.file.path;
//   if (!filePath) {
//     return res.status(500).json({
//       success: false,
//       message: "File upload failed",
//     });
//   } else {
//     return res.status(200).json({
//       message: "File uploaded successfully",
//       result: filePath,
//     });
//   }
// });



