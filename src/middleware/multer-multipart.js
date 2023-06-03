const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  fileSize: 1024 * 1024 * 5,
});

module.exports = multer;
