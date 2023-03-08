import { Router } from "express";
import projectController from "../controllers/projectController";

const projectRouter = Router();

projectRouter.get("/", projectController.getAllProjects);
projectRouter.post("/create", projectController.createProject);
projectRouter.post("/users", projectController.addUserToProject);
projectRouter.get("/:projectId/users", projectController.getProjectUsers);
projectRouter.post("/remove-users", projectController.removeUserFromProject);

export default projectRouter;
