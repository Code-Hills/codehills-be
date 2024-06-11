import express from "express";
import ReviewControllers from "../controllers/reviewControllers";
import protect from "../middlewares";
import allowedRole from "../middlewares/allowedRoles";
import { validateRequestBody } from "../middlewares/validateRequestBody";
import { overallReviewSchema } from "../../system/validators";

const router = express.Router();

router.post(
  "/",
  protect,
  allowedRole(["developer", "architect"]),
  validateRequestBody(overallReviewSchema),
  ReviewControllers.create
);
router.get("/", protect, ReviewControllers.getAll);
router.get(
  "/:reviewCycleId/reviewers",
  protect,
  allowedRole(["admin", "architect"]),
  ReviewControllers.getAllReviewers
);

export default router;
