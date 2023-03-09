import { Router } from "express";
import UserControllers from "../controllers/userControllers";
import protect from "../middlewares";

const router = Router();

router.post("/", UserControllers.addUser);
router.get("/", protect, UserControllers.getAllUsers);
router.put("/assign-role", protect, UserControllers.assignRoles);
router.put("/deactivate", protect, UserControllers.deactivateUser);
router.put("/activate", protect, UserControllers.activateUser);
router.get("/:userId/projects", protect, UserControllers.getUserProjects);

export default router;
