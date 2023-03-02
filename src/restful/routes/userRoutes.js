import { Router } from "express";
import UserControllers from "../controllers/userControllers";

const router = Router();

router.post("/", UserControllers.addUser);
router.get("/", UserControllers.getAllUsers);

export default router;
