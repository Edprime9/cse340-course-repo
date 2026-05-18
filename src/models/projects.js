import db from "./db.js";

async function getAllProjects() {
  const sql = `
        SELECT 
            service_projects.project_id,
            service_projects.title,
            service_projects.description,
            service_projects.location,
            service_projects.project_date,
            organization.name
        FROM service_projects
        JOIN organization
        ON service_projects.organization_id = organization.organization_id
        ORDER BY service_projects.project_date;
    `;

  const result = await pool.query(sql);
  return result.rows;
}

module.exports = {
  getAllProjects,
};
