const fs = require("fs");
const path = require("path");

const master = JSON.parse(fs.readFileSync("master.json", "utf8"));
const configDir = path.join(__dirname, "..", "configs");

fs.readdirSync(configDir).forEach(file => {
  if (file.endsWith(".json")) {
    const filePath = path.join(configDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Merge master values into target JSON
    const updated = { ...content, ...master };

    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
    console.log(`Updated ${filePath}`);
  }
});
