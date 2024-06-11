import Response from "../../system/helpers/Response";
import ratingFieldService from "../../services/ratingFieldService";

const {
  createRatingField,
  findAllRatingFields,
  checkRatingFieldExists,
  findRatingFieldById,
} = ratingFieldService;

export default class RatingFieldController {
  static async createRatingField(req, res) {
    try {
      const { name, categoryId } = req.body;
      // Check existance
      const ratingFields = await checkRatingFieldExists(name, categoryId);
      if (ratingFields) {
        return Response.error(res, 409, {
          message: "Rating Field already exists in given category",
        });
      }
      const createCategory = await createRatingField({ name, categoryId });
      return Response.success(res, 200, {
        message: "Rating Field created successfully",
        data: createCategory,
      });
    } catch (error) {
      return Response.error(res, 500, error);
    }
  }

  static async findAllRatingFields(req, res) {
    try {
      const ratingCategories = await findAllRatingFields();
      return Response.success(res, 200, {
        message: "Rating fields retreived successfully",
        data: ratingCategories,
      });
    } catch (error) {
      return Response.error(res, 500, error);
    }
  }

  static async findRatingFieldById(req, res) {
    try {
      const { id } = req.params;
      const ratingFields = await findRatingFieldById(id);
      if (!ratingFields) {
        return Response.error(res, 404, {
          message: "Rating field not found",
        });
      }
      return Response.success(res, 200, {
        message: "Rating fields retreived successfully",
        data: ratingFields,
      });
    } catch (error) {
      return Response.error(res, 500, error);
    }
  }

  static async deleteRatingField(req, res) {
    try {
      const { id } = req.params;
      const ratingField = await findRatingFieldById(id);
      if (!ratingField) {
        return Response.error(res, 404, {
          message: "Rating field not found",
        });
      }
      await ratingField.destroy();
      return Response.success(res, 200, {
        message: "Rating field deleted successfully",
      });
    } catch (error) {
      return Response.error(res, 500, error);
    }
  }
}
