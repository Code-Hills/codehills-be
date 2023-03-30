import express from "express";
import AuthController from "../controllers/authControllers";
import UserControllers from "../controllers/userControllers";
import protect from "../middlewares";

const router = express.Router();

router.get("/", protect, AuthController.profile);

router.put("/", protect, UserControllers.update);

export default router;
