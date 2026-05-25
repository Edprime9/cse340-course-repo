import db from "./db.js";

const getAllProjects = async () => {
  const query = `
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

  const result = await db.query(query);

  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId };
