import { Router } from "express";
import allowedRole from "../middlewares/allowedRoles";
import ratingFieldController from "../controllers/ratingFieldController";
import protect from "../middlewares";

const {
  createRatingField,
  findRatingFieldById,
  findAllRatingFields,
  deleteRatingField,
} = ratingFieldController;

const ratingFieldRouter = Router();

ratingFieldRouter.post("/", protect, allowedRole(["admin"]), createRatingField);
ratingFieldRouter.get(
  "/",
  protect,
  allowedRole(["admin"]),
  findAllRatingFields
);
ratingFieldRouter.get(
  "/:id",
  protect,
  allowedRole(["admin"]),
  findRatingFieldById
);
ratingFieldRouter.delete(
  "/:id",
  protect,
  allowedRole(["admin"]),
  deleteRatingField
);

export default ratingFieldRouter;
