const path = require("path");
const Jimp = require("jimp");
const fs = require("fs");

exports.saveImages = catchAsyncErrors(async (req, res, next) => {
  //   Defualt upload directory for images upload
  const rootDir = "../uploads";
  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }
  let d = new Date();
  let todaysDir = d.toISOString().split("T")[0];
  const dir = path.join(dir, todaysDir);
  console.log(dir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});
