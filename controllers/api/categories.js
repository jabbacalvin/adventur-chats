const Category = require('../../models/category');

module.exports = {
  index,
  show,
  // fetchCategories
};

async function index(req, res) {
  console.log("index")
  try {
    const categories = await Category.find({})
    console.log(categories)
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "An error occurred while fetching categories." });
  }
}

async function show(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "An error occurred while fetching the category." });
  }
}

// async function fetchCategories(req, res) {
//   try {
//     const categories = await Category.find({})
//     res.json(categories);
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ error: "An error occurred while fetching categories." });
//   }}