import Response from "../../system/helpers/Response";
import RatingCategoryService from "../../services/ratingCategoryService";

const {
  createRatingCategory,
  findAllRatingCategories,
  findRatingCategoryById,
  checkRatingCategoryExists,
  updateRatingCategoryName,
} = RatingCategoryService;

export default class RatingCategoryController {
  static async createRatingCategory(req, res) {
    try {
      const { name } = req.body;
      // Check existance
      const ratingCategory = await checkRatingCategoryExists(name);
      if (ratingCategory) {
        return Response.error(res, 409, {
          message: "Rating Category already exists",
        });
      }
      const createCategory = await createRatingCategory({ name });
      return Response.success(res, 201, {
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
  static async updateRatingCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const ratingCategory = await findRatingCategoryById(id);
      if (!ratingCategory) {
        return Response.error(res, 404, {
          message: "Rating Category not found",
        });
      }
      const exitingCategory = await checkRatingCategoryExists(name);
      if (exitingCategory && exitingCategory.id != id) {
        return Response.error(res, 409, {
          message: "Rating category name already exists",
        });
      } else {
        const updatedCategory = await updateRatingCategoryName(id, name);
        return Response.success(res, 200, {
          message: "Rating category is updated successfully",
          data: updatedCategory,
        });
      }
    } catch (error) {
      return Response.error(res, 500, error);
    }
  }
}
