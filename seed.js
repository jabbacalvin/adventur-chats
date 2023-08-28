require("dotenv").config();
require("./config/database");
const Category = require("./models/category");

(async function () {
  try {
    console.log("Deleting existing categories...");
    await Category.deleteMany();

    console.log("Creating new categories...");
    const categories = await Category.create([
      { name: "Outdoors/Nature 🌲" },
      { name: "Beaches 🏖️" },
      { name: "Food 🍝" },
      { name: "Activities 🏄‍♂️" },
      { name: "Festivals 🎏" },
      { name: "Landmarks 🗺️" },
    ]);

    console.log("New categories created:", categories);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
})();
