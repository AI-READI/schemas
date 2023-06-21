import https from "https";
import fs from "fs";
import schemaListJSON from "../public/assets/data/fileList.json" assert { type: "json" };

console.log("Pulling schemas to public folder...");

schemaListJSON.forEach((schema) => {
  // Download the file to the public folder
  const url = schema;
  const filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  const path = `./public/${filename}`;
  console.log(`Downloading ${filename} to ${path}`);

  const file = fs.createWriteStream(path);
  const request = https.get(url, function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
      file.close();
      console.log("Download Completed for " + filename);
    });
  });
});
