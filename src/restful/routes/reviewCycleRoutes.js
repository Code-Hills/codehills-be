import express from "express";
import ReviewCycleControllors from "../controllers/reviewCycleControllers";
import protect from "../middlewares";
import allowedRole from "../middlewares/allowedRoles";

const router = express.Router();

router.post(
  "/",
  protect,
  allowedRole(["admin"]),
  ReviewCycleControllors.create
);
router.get("/", protect, ReviewCycleControllors.getALl);
router.get("/:id", protect, ReviewCycleControllors.getOne);
router.put(
  "/:id",
  protect,
  allowedRole(["admin"]),
  ReviewCycleControllors.update
);
router.delete(
  "/:id",
  protect,
  allowedRole(["admin"]),
  ReviewCycleControllors.delete
);
router.put(
  "/start/:id",
  protect,
  allowedRole(["admin"]),
  ReviewCycleControllors.start
);
router.put(
  "/end/:id",
  protect,
  allowedRole(["admin"]),
  ReviewCycleControllors.end
);

export default router;
