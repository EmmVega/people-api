const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const fileUpload = multer({
   limits: 200000,
   storage: multer.diskStorage({
      destination: (req, file, cb) => {
         cb(null, "uploads/documents");
      },
      filename: (req, file, cb) => {
         const ext = "pdf";
         cb(null, uuidv4() + "." + ext);
      },
   }),
   fileFilter: (req, file, cb) => {
      const isValid = file.mimetype === "application/pdf";
      let error = isValid ? null : new Error("Invalid mime type!");
      cb(error, isValid);
   },
});

module.exports = fileUpload;
