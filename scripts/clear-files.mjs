import fs from "fs";
import schemaListJSON from "../public/assets/data/fileList.json" assert { type: "json" };

console.log("Removing old files...");

schemaListJSON.forEach((schema) => {
  const url = schema;
  const filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  const path = `./public/${filename}`;

  fs.unlinkSync(path);

  console.log(`Removed ${path}`);
});
