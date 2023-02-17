import { Router } from "express";
import {
  addUser,
  getAllUsers,
  welcomeController,
} from "../controllers/index.js";
const router = Router();

router.get("/", welcomeController);
router.get("/users", getAllUsers);
router.post("/users/add", addUser);

export default router;
