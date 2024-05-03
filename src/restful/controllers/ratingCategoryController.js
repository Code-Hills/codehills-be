import Response from "../../system/helpers/Response";
import RatingCategoryService from "../../services/ratingCategoryService";
import * as v from "valibot";
import { ratingCategorySchema } from "../../system/validators";
import { filterValidationError } from "../../system/utils";

const {
  createRatingCategory,
  findAllRatingCategories,
  findRatingCategoryById,
  checkRatingCategoryExists,
} = RatingCategoryService;

export default class RatingCategoryController {
  static async createRatingCategory(req, res) {
    try {
      const results = v.safeParse(ratingCategorySchema, req.body);
      if (!results.success) {
        return Response.error(res, 400, {
          message: "Please correct your inputs",
          errors: filterValidationError(results.issues),
        });
      }
      // Check existance
      const ratingCategory = await checkRatingCategoryExists(
        results.output.name
      );
      if (ratingCategory) {
        return Response.error(res, 409, {
          message: "Rating Category already exists",
        });
      }
      const createCategory = await createRatingCategory(results.output);
      return Response.success(res, 200, {
        message: "Rating Category created successfully",
        data: createCategory,
      });
    } catch (error) {
      return Response.error(res, 500, error);
    }
  }

  static async findAllRatingCategories(req, res) {
    try {
      const ratingCategories = await findAllRatingCategories();
      return Response.success(res, 200, {
        message: "Rating Categories retreived successfully",
        data: ratingCategories,
      });
    } catch (error) {
      return Response.error(res, 500, error);
    }
  }

  static async findRatingCategoryById(req, res) {
    try {
      const { id } = req.params;
      const ratingCategory = await findRatingCategoryById(id);
      if (!ratingCategory) {
        return Response.error(res, 404, {
          message: "Rating Category not found",
        });
      }
      return Response.success(res, 200, {
        message: "Rating Category retreived successfully",
        data: ratingCategory,
      });
    } catch (error) {
      return Response.error(res, 500, error);
    }
  }

  static async deleteRatingCategory(req, res) {
    try {
      const { id } = req.params;
      const ratingCategory = await findRatingCategoryById(id);
      if (!ratingCategory) {
        return Response.error(res, 404, {
          message: "Rating Category not found",
        });
      }
      await ratingCategory.destroy();
      return Response.success(res, 200, {
        message: "Rating Category deleted successfully",
      });
    } catch (error) {
      return Response.error(res, 500, error);
    }
  }
}
