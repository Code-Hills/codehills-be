import { Router } from "express";
import UserControllers from "../controllers/userControllers";
import protect from "../middlewares";

const router = Router();

router.post("/", UserControllers.addUser);
router.get("/", protect, UserControllers.getAllUsers);
router.put("/deactivate", protect, UserControllers.deactivateUser);
router.put("/activate", protect, UserControllers.activateUser);
router.patch("/roles", protect, UserControllers.assignRoles);
router.get("/:userId/projects", protect, UserControllers.getUserProjects);

export default router;
