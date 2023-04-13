import express from "express";
import ReviewControllers from "../controllers/reviewControllers";
import protect from "../middlewares";

const router = express.Router();

router.post("/", protect, ReviewControllers.create);
router.get("/", protect, ReviewControllers.getAll);

export default router;
