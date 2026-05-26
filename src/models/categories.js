import db from "./db.js";

const getAllCategories = async () => {
  const query = `
        SELECT 
            category_id,
            name,
            description
        FROM categories
        ORDER BY name;
    `;

  const result = await db.query(query);

  return result.rows;
};

const getCategoryById = async (categoryId) => {
  const query = `
        SELECT
            category_id,
            name,
            description
        FROM categories
        WHERE category_id = $1;
    `;

  const queryParams = [categoryId];

  const result = await db.query(query, queryParams);

  return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
        SELECT
            service_projects.project_id,
            service_projects.title
        FROM project_categories
        JOIN service_projects
        ON project_categories.project_id = service_projects.project_id
        WHERE project_categories.category_id = $1
        ORDER BY service_projects.project_date;
    `;

  const queryParams = [categoryId];

  const result = await db.query(query, queryParams);

  return result.rows;
};

export { getAllCategories, getCategoryById, getProjectsByCategoryId };
