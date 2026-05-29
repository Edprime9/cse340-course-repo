import express from "express";

import { showHomePage } from "./controllers/index.js";
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation,
  showEditOrganizationForm,
  processEditOrganizationForm,
} from "./controllers/organizations.js";

import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation,
  showEditProjectForm,
  processEditProjectForm,
} from "./controllers/projects.js";

import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
} from "./controllers/categories.js";

import { testErrorPage } from "./controllers/errors.js";

const router = express.Router();

router.get("/", showHomePage);
router.get("/organizations", showOrganizationsPage);
router.get("/projects", showProjectsPage);
router.get("/project/:id", showProjectDetailsPage);
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);
router.get("/organization/:id", showOrganizationDetailsPage); // Route for organization details page
router.get("/new-organization", showNewOrganizationForm); // Route for new organization page
router.post(
  "/new-organization",
  organizationValidation,
  processNewOrganizationForm,
); // Route to handle new organization form submission
router.get("/edit-organization/:id", showEditOrganizationForm); // Route to display the edit organization form
router.post(
  "/edit-organization/:id",
  organizationValidation,
  processEditOrganizationForm,
); // Route to handle the edit organization form submission
router.get("/new-project", showNewProjectForm); // Route for new project page
router.post("/new-project", projectValidation, processNewProjectForm); // Route to handle new project form submission
router.get("/test-error", testErrorPage); // error-handling routes

// Routes to handle the assign categories to project form
router.get("/assign-categories/:projectId", showAssignCategoriesForm);
router.post("/assign-categories/:projectId", processAssignCategoriesForm);
router.get("/edit-project/:id", showEditProjectForm); // Edit project form
router.post("/edit-project/:id", processEditProjectForm); // Process edit project form

export default router;
