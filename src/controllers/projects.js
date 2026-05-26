import { getUpcomingProjects, getProjectDetails } from "../models/projects.js";

import { getCategoriesByProjectId } from "../models/categories.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

  const title = "Upcoming Service Projects";

  res.render("projects", {
    title,
    projects,
  });
};

const showProjectDetailsPage = async (req, res) => {
  const projectId = req.params.id;

  const project = await getProjectDetails(projectId);

  // GET THE CATEGORIES
  const categories = await getCategoriesByProjectId(projectId);

  const title = project.title;

  console.log(categories);

  // SEND categories TO EJS
  res.render("project", {
    title,
    project,
    categories,
  });
};

export { showProjectsPage, showProjectDetailsPage };
