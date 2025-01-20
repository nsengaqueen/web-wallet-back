import express from 'express';
import { createCategory, getAllCategories } from '../controllers/categoryController.js';
import Category from "../models/Category.js";


const router = express.Router();

// Add a new category
router.post('/', createCategory);

// Get all categories
router.get('/', getAllCategories);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the category exists
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete the category
    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
