import https from "https";
import fs from "fs";
import schemaListJSON from "../data/fileList.json" assert { type: "json" };

console.log("Delete the public/files folder...");

if (!fs.existsSync("./public/files")) {
  fs.mkdirSync("./public/files");
} else {
  fs.rmdirSync("./public/files", { recursive: true });
  fs.mkdirSync("./public/files");
}

console.log("Pulling schemas to public folder...");

schemaListJSON.forEach((schema) => {
  const { title, fileName, versions } = schema;

  console.log(`Pulling files for ${title}...`);

  versions.forEach((version) => {
    const { url, label, fileLabel } = version;

    // create the version folder

    if (fileLabel && !fs.existsSync(`./public/files/${fileLabel}`)) {
      fs.mkdirSync(`./public/files/${fileLabel}`);
    }

    const filePath = fileLabel
      ? `./public/files/${fileLabel}/${fileName}`
      : `./public/files/${fileName}`;
    console.log(`Downloading ${fileName} to ${filePath}...`);

    const file = fs.createWriteStream(filePath);

    const request = https.get(url, function (response) {
      response.pipe(file);

      // after download completed close filestream
      file.on("finish", () => {
        file.close();
        console.log(`Download completed for ${fileName} version ${label}`);
      });
    });
  });
});
