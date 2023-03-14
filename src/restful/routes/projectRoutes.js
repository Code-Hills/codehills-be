import { Router } from "express";
import protect from "../middlewares";
import projectController from "../controllers/projectController";

const {
  getAllProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getProjectUsers,
  addUserToProject,
  removeUserFromProject,
  updateProjectLead,
} = projectController;

const projectRouter = Router();

projectRouter.get("/", protect, getAllProjects);
projectRouter.post("/create", protect, createProject);
projectRouter.get("/:projectId", protect, getProject);
projectRouter.patch("/:projectId", protect, updateProject);
projectRouter.delete("/:projectId", protect, deleteProject);
projectRouter.get("/:projectId/users", protect, getProjectUsers);
projectRouter.put("/:projectId/users", protect, addUserToProject);
projectRouter.delete("/:projectId/users", protect, removeUserFromProject);
projectRouter.patch("/:projectId/lead", protect, updateProjectLead);

export default projectRouter;
