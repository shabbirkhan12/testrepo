const fs = require("fs");
const path = require("path");

const master = JSON.parse(fs.readFileSync("master.json", "utf8"));
const configDir = path.join(__dirname, "..", "configs");

// Define unique "name" values for each file
const names = {
  "file1.json": "shabbir",
  "file2.json": "hamid",
  "file3.json": "habib",
};

fs.readdirSync(configDir).forEach(file => {
  if (file.endsWith(".json")) {
    const filePath = path.join(configDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Merge master values + unique name per file
    const updated = {
      ...content,
      ...master,
      ...(names[file] ? { name: names[file] } : {}), // inject if defined
    };

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    console.log(`Updated ${filePath}`);
  }
});
