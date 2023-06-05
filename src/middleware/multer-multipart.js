const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
});

module.exports = multer;
