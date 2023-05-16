import express from "express";
import ReviewControllers from "../controllers/reviewControllers";
import protect from "../middlewares";
import allowedReviewer from "../middlewares/allowedReviewers";

const router = express.Router();

router.post("/", protect, allowedReviewer, ReviewControllers.create);
router.get("/", protect, ReviewControllers.getAll);

export default router;
