import { Router } from "express";
import { welcomeController } from "../controllers/index.js";
const router = Router();

router.get("/", welcomeController);

export default router;
