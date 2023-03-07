import express from "express";
import AuthController from "../controllers/authControllers";
import protect from "../middlewares";

const router = express.Router();

router.get("/", protect, AuthController.profile);

router.put("/", protect, AuthController.update);

export default router;
