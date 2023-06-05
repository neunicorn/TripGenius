require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const fs = require("fs");
const path = require("path");

const pathKey = path.resolve("./serviceAccountKey.json");

const cloudStorage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: pathKey,
});

const bucketName = process.env.GCP_BUCKET_NAME;
const bucket = cloudStorage.bucket(bucketName);

class ImageHelper {
  static getPublicUrl(filename) {
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
  }

  static async uploadToGCS(req, res, next) {
    if (!req.file) {
      return next();
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on("error", (err) => {
      req.file.cloudStorageError = err;
      next(err);
    });

    stream.on("finish", () => {
      req.file.cloudStorageObject = gcsname;
      req.file.gcsUrl = ImageHelper.getPublicUrl(gcsname);
      next();
    });

    stream.end(req.file.buffer);
  }
  static async deleteFromGCS(filename) {
    await bucket.file(filename).delete();
  }
}

module.exports = ImageHelper;
