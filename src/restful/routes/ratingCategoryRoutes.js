import { Router } from "express";
import allowedRole from "../middlewares/allowedRoles";
import RatingCategoryController from "../controllers/ratingCategoryController";
import protect from "../middlewares";
import { validateRequestBody } from "../middlewares/validateRequestBody";
import { ratingCategorySchema } from "../../system/validators";

const {
  createRatingCategory,
  findAllRatingCategories,
  findRatingCategoryById,
  deleteRatingCategory,
  updateRatingCategory,
} = RatingCategoryController;

const ratingCategoryRouter = Router();

ratingCategoryRouter.post(
  "/",
  protect,
  allowedRole(["admin"]),
  validateRequestBody(ratingCategorySchema),
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
ratingCategoryRouter.patch(
  "/:id",
  protect,
  allowedRole(["admin"]),
  validateRequestBody(ratingCategorySchema),
  updateRatingCategory
);
ratingCategoryRouter.delete(
  "/:id",
  protect,
  allowedRole(["admin"]),
  deleteRatingCategory
);

export default ratingCategoryRouter;
