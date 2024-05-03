import { Router } from "express";
import allowedRole from "../middlewares/allowedRoles";
import RatingCategoryController from "../controllers/ratingCategoryController";
import protect from "../middlewares";

const {
  createRatingCategory,
  findAllRatingCategories,
  findRatingCategoryById,
  deleteRatingCategory,
} = RatingCategoryController;

const ratingCategoryRouter = Router();

ratingCategoryRouter.post(
  "/",
  protect,
  allowedRole(["admin"]),
  createRatingCategory
);
ratingCategoryRouter.get(
  "/",
  protect,
  allowedRole(["admin"]),
  findAllRatingCategories
);
ratingCategoryRouter.get(
  "/:id",
  protect,
  allowedRole(["admin"]),
  findRatingCategoryById
);
ratingCategoryRouter.delete(
  "/:id",
  protect,
  allowedRole(["admin"]),
  deleteRatingCategory
);

export default ratingCategoryRouter;
