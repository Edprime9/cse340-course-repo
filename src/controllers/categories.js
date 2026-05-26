import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
} from "../models/categories.js";

// Existing page
const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();

  const title = "Service Categories";

  res.render("categories", {
    title,
    categories,
  });
};

// New category details page
const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;

  const category = await getCategoryById(categoryId);

  const projects = await getProjectsByCategoryId(categoryId);

  const title = category.name;

  res.render("category", {
    title,
    category,
    projects,
  });
};

export { showCategoriesPage, showCategoryDetailsPage };
