const axios = require("axios");
const fs = require("fs");
const Path = require("path");

async function downloadImage(params) {
  let img_name = params.split("/").pop();
  const url = `https://incois.gov.in/${params}`;
  const path = Path.resolve(__dirname, "images", img_name);
  const writer = fs.createWriteStream(path);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

module.exports = { downloadImage };
