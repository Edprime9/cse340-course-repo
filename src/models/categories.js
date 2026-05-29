import db from "./db.js";

// Get all categories
const getAllCategories = async () => {
  const query = `
    SELECT category_id, name, description
    FROM categoriess
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
  // Remove existing category assignments
  await db.query(
    `DELETE FROM project_categories
     WHERE project_id = $1`,
    [projectId],
  );

  // Add new category assignments
  for (const categoryId of categoryIds) {
    await db.query(
      `INSERT INTO project_categories (project_id, category_id)
       VALUES ($1, $2)`,
      [projectId, categoryId],
    );
  }
};

export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  getProjectsByCategoryId,
  updateCategoryAssignments,
};
