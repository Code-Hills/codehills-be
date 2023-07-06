import { Router } from "express";
import UserControllers from "../controllers/userControllers";
import protect from "../middlewares";
import ReviewControllers from "../controllers/reviewControllers";
const { getPeerReviewers, approveReviewer, rejectReviewer, getReviews } =
  ReviewControllers;

const router = Router();

router.post("/", UserControllers.addUser);
router.get("/", protect, UserControllers.getAllUsers);
router.get("/:userId", protect, UserControllers.getUserById);
router.patch("/deactivate", protect, UserControllers.deactivateUser);
router.patch("/activate", protect, UserControllers.activateUser);
router.patch("/roles", protect, UserControllers.assignRoles);
router.get("/:userId/projects", protect, UserControllers.getUserProjects);
router.post("/reviewers", protect, ReviewControllers.selectPeerReviewers);
router.get("/reviewers/:reviewCycleId", protect, getPeerReviewers);
router.get("/:developerId/reviews/:reviewCycleId", protect, getReviews);
router.patch("/:developerId/reviewers/approve", protect, approveReviewer);
router.patch("/:developerId/reviewers/reject", protect, rejectReviewer);
router.delete(
  "/reviewers/:reviewerId",
  protect,
  ReviewControllers.deleteMyReviewer
);

export default router;
