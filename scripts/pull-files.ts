/**
 * This script is used to pull the schema files from the source
 * and save them in bunny storage.
 */
import "dotenv/config";
import schemaListJSON from "../data/fileList.json" assert { type: "json" };

schemaListJSON.forEach((schema) => {
  const { title, fileName, versions } = schema;

  console.log(`Pulling files for ${title}...`);

  versions.forEach(async (version) => {
    const { url, label, fileLabel } = version;

    // Get the content of the file
    const request = await fetch(url);

    if (!request.ok) {
      console.error(`Failed to download ${url}`);
      return;
    }

    const jsonData = await request.text();

    // convert the json data into a file to be uploaded
    const jsonFile = new File([jsonData], fileName, {
      type: "application/json",
    });

    console.log(
      `File name: ${fileName} version: ${label} label: ${fileLabel ?? "root"}`
    );

    const filePath = fileLabel ? `${fileLabel}/${fileName}` : `${fileName}`;

    console.log(`Saving file to ${filePath}...`);

    // Save the file to the bunny storage
    const uploadResponse = await fetch(
      `https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_BUCKET_NAME}/${filePath}`,
      {
        method: "PUT",
        headers: {
          AccessKey: process.env.BUNNY_STORAGE_ACCESS_KEY ?? "",
          "Content-Type": "application/json",
        },
        body: jsonFile,
      }
    );

    if (!uploadResponse.ok) {
      console.error(`Failed to upload ${fileName} version ${label}`);
      return;
    }
  });
});
