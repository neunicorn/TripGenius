require("dotenv").config();
const { Storage } = require("@google-cloud/storage");
const path = require("path");

const pathKey = path.resolve("./serviceAccountKey.json");

const cloudStorage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: pathKey,
});

const bucketName = process.env.GCP_BUCKET_NAME;
const bucket = cloudStorage.bucket(bucketName);

class ImageHelper {}

module.exports = ImageHelper;
