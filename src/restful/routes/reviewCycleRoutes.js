import express from "express";
import ReviewCycleControllors from "../controllers/reviewCycleControllers";
import protect from "../middlewares";

const router = express.Router();

router.post("/", protect, ReviewCycleControllors.create);
router.get("/", protect, ReviewCycleControllors.getALl);
router.get("/:id", protect, ReviewCycleControllors.getOne);
router.patch("/:id", protect, ReviewCycleControllors.update);
router.delete("/:id", protect, ReviewCycleControllors.delete);
router.put("/start/:id", protect, ReviewCycleControllors.start);
router.put("/end/:id", protect, ReviewCycleControllors.end);

export default router;
