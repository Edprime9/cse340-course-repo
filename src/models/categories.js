import db from "./db.js";

// Get all categories
const getAllCategories = async () => {
  const query = `
    SELECT category_id, name, description
    FROM categories
    ORDER BY name;
  `;

  const result = await db.query(query);
  return result.rows;
};

// Get one category by ID
const getCategoryById = async (categoryId) => {
  const query = `
    SELECT category_id, name, description
    FROM categories
    WHERE category_id = $1;
  `;

  const result = await db.query(query, [categoryId]);

  return result.rows[0];
};

// Get categories for a project
const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT
      categories.category_id,
      categories.name
    FROM categories
    JOIN project_categories
      ON categories.category_id = project_categories.category_id
    WHERE project_categories.project_id = $1;
  `;

  const result = await db.query(query, [projectId]);

  return result.rows;
};

// Get projects for a category
const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT
      service_projects.project_id,
      service_projects.title
    FROM service_projects
    JOIN project_categories
      ON service_projects.project_id = project_categories.project_id
    WHERE project_categories.category_id = $1
    ORDER BY service_projects.project_date;
  `;

  const result = await db.query(query, [categoryId]);

  return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
};

export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  getProjectsByCategoryId,
  updateCategoryAssignments,
};
