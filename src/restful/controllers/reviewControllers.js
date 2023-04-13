/* eslint-disable no-constant-condition */
/* eslint-disable no-useless-catch */
import Response from "../../system/helpers/Response";
import { reviewerType } from "../../system/utils/riviewerType";
import ReviewService from "../../services/reviewServices";
import UserService from "../../services/userService";

export default class ReviewControllers {
  static async create(req, res) {
    try {
      const { id: reviewerId } = req.user;
      const { revieweeId, description, ratings } = req.body;
      const user = await UserService.findUserById(revieweeId);
      if (!user) {
        return Response.error(res, 400, {
          message: "User not found",
        });
      }
      const type = await reviewerType(revieweeId, reviewerId);
      let ratingz =
        type === "manager review" || "peer review" ? Number(ratings) : null;
      ReviewService.create({
        revieweeId,
        reviewerId,
        description,
        type,
        ratingz,
      })
        .then((review) => {
          return Response.success(res, 200, {
            message: "review created successfully",
            data: review,
          });
        })
        .catch((error) => {
          return Response.error(res, 403, {
            message: "review failed to be created",
            error: error.message,
          });
        });
    } catch (error) {
      return Response.error(res, 500, {
        message: "server error",
        error: error.message,
      });
    }
  }
  static async getAll(req, res) {
    ReviewService.findAll()
      .then((review) => {
        return Response.success(res, 200, {
          message: "review retreived successfully",
          data: review,
        });
      })
      .catch((error) => {
        return Response.error(res, 403, {
          message: "review failed to be retreived",
          error: error.message,
        });
      });
  }
}
