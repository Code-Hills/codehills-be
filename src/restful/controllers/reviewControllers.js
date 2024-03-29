/* eslint-disable no-constant-condition */
/* eslint-disable no-useless-catch */
import Response from "../../system/helpers/Response";
import { reviewerType } from "../../system/utils/riviewerType";
import ReviewService from "../../services/reviewServices";
import UserService from "../../services/userService";
import ReviewCycleService from "../../services/reviewCycleServices";

export default class ReviewControllers {
  static async create(req, res) {
    try {
      const { id: reviewerId } = req.user;
      const { revieweeId, description, ratings, reviewCycleId } = req.body;

      const selectedReviewer = await ReviewService.findReviewer(
        reviewerId,
        revieweeId,
        reviewCycleId
      );

      if (
        req.user.role === "developer" &&
        revieweeId !== reviewerId &&
        !selectedReviewer
      ) {
        return Response.error(res, 400, {
          message: "You have not been selected to give a review",
        });
      }

      if (selectedReviewer?.status === "pending") {
        return Response.error(res, 400, {
          message: "You have not been approved yet",
        });
      }

      if (selectedReviewer?.status === "rejected") {
        return Response.error(res, 400, {
          message: "You have been rejected",
        });
      }

      const user = await UserService.findUserById(revieweeId);
      const reviewCycle = await ReviewCycleService.findById(reviewCycleId);
      if (!user) {
        return Response.error(res, 404, {
          message: "User not found",
        });
      }
      if (!reviewCycle) {
        return Response.error(res, 404, {
          message: "Review Cycle not found",
        });
      }
      if (reviewCycle?.active == false) {
        return Response.error(res, 401, {
          message: "This review cycle is closed",
        });
      }

      const type = await reviewerType(revieweeId, reviewerId);
      const reviewMade = await ReviewService.findONE({
        reviewerId,
        revieweeId,
        reviewCycleId,
        type,
      });
      if (reviewMade) {
        return Response.error(res, 401, {
          message: "review have been made",
        });
      }
      let ratingz = type === "manager review" ? Number(ratings) : null;
      ReviewService.create({
        revieweeId,
        reviewerId,
        description,
        type,
        ratingz,
        reviewCycleId,
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

  static async selectPeerReviewers(req, res) {
    try {
      const { reviewCycleId, reviewerId } = req.body;

      const reviewCycle = await ReviewCycleService.findById(reviewCycleId);
      if (!reviewCycle) {
        return Response.error(res, 404, {
          message: "Review Cycle not found",
        });
      }
      if (reviewCycle?.active == false) {
        return Response.error(res, 401, {
          message: "This review cycle is not active",
        });
      }

      const developerId = req.user.id;

      const existingReviewers = await ReviewService.findAllReviewers(
        developerId,
        reviewCycleId
      );

      if (developerId === reviewerId) {
        return Response.error(res, 400, {
          message: "You can not select yourself as a reviewer",
        });
      }

      if (existingReviewers?.length >= 2) {
        return Response.error(res, 400, {
          message: "You can not select more than two peer-reviewers",
        });
      }

      const reviewer = await UserService.findUserById(reviewerId);
      if (!reviewer || !reviewer.isActivated) {
        return Response.error(res, 404, {
          message: "Reviewer not found!",
        });
      }

      if (reviewer.role !== "developer") {
        return Response.error(res, 400, {
          message: "Only select developers for peer-reviews",
        });
      }

      const alreadyReviewer = await ReviewService.findReviewer(
        reviewerId,
        developerId,
        reviewCycleId
      );

      if (alreadyReviewer) {
        return Response.error(res, 400, {
          message: "You have already selected this reviewer",
        });
      }

      await ReviewService.addReviewer({
        developerId,
        reviewerId,
        reviewCycleId,
      });

      return Response.success(res, 200, {
        message: "Reviewer selected successfully",
      });
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, {
        message: "Server error",
        error: error.message,
      });
    }
  }

  static async getReviews(req, res) {
    try {
      const { developerId, reviewCycleId } = req.params;
      const developer = await UserService.findUserById(developerId);
      if (!developer) {
        return Response.error(res, 404, {
          message: "developer not found",
        });
      }

      const reviewCycle = await ReviewCycleService.findById(reviewCycleId);
      if (!reviewCycle) {
        return Response.error(res, 404, {
          message: "Review Cycle not found",
        });
      }

      const reviews = await ReviewService.getReviews(
        developerId,
        reviewCycleId
      );

      res.status(200).json({
        message: `Successfully retrieved developer reviews for the selected cycle`,
        reviews: reviews,
      });
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, {
        message: "Server error",
        error: error.message,
      });
    }
  }

  static async getPeerReviewers(req, res) {
    try {
      const { developerId, status } = req.query;
      const { reviewCycleId } = req.params;

      if (developerId) {
        const developer = await UserService.findUserById(developerId);
        if (!developer) {
          return res.status(404).json({ error: "developer not found" });
        }
      }

      const reviewCycle = await ReviewCycleService.findById(reviewCycleId);
      if (!reviewCycle) {
        return Response.error(res, 404, {
          message: "Review Cycle not found",
        });
      }

      const reviewers = await ReviewService.getReviewers(
        developerId,
        reviewCycleId,
        status
      );

      res.status(200).json({
        message: `Retrieved All peer-reviewers for the selected cycle`,
        reviewers: reviewers,
      });
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, {
        message: "Server error",
        error: error.message,
      });
    }
  }

  static async getAllReviewers(req, res) {
    try {
      const { reviewCycleId } = req.params;

      const reviewCycle = await ReviewCycleService.findById(reviewCycleId);
      if (!reviewCycle) {
        return Response.error(res, 404, {
          message: "Review Cycle not found",
        });
      }

      const reviewers = await ReviewService.getAllReviewers(reviewCycleId);

      res.status(200).json({
        message: `Retrieved All reviewers for the selected cycle`,
        reviewers: reviewers,
      });
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, {
        message: "Server error",
        error: error.message,
      });
    }
  }

  static async approveReviewer(req, res) {
    try {
      const architect = req.user;
      if (architect?.role !== "architect") {
        return Response.error(res, 403, {
          message: "Only project lead or architect can approve reviewers",
        });
      }

      const { developerId } = req.params;
      const { reviewerId, reviewCycleId } = req.body;
      const reviewer = await ReviewService.findReviewer(
        reviewerId,
        developerId,
        reviewCycleId
      );
      if (!reviewer) {
        return res
          .status(404)
          .json({ error: "Reviewer not found for this developer" });
      }
      reviewer.status = "approved";
      await reviewer.save();
      return res.status(200).json({
        message: "Reviewer approved successfully",
        reviewer: { reviewerId: reviewerId, status: reviewer.status },
      });
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, {
        message: "Server error",
        error: error.message,
      });
    }
  }

  static async rejectReviewer(req, res) {
    try {
      const architect = req.user;
      if (architect?.role !== "architect") {
        return Response.error(res, 403, {
          message: "Only project lead or architect can reject reviewers",
        });
      }

      const { developerId } = req.params;
      const { reviewerId, reviewCycleId } = req.body;
      const reviewer = await ReviewService.findReviewer(
        reviewerId,
        developerId,
        reviewCycleId
      );
      if (!reviewer) {
        return res
          .status(404)
          .json({ error: "Reviewer not found for this developer" });
      }
      reviewer.status = "rejected";
      await reviewer.save();
      return res.status(200).json({
        message: "Reviewer rejected successfully",
        reviewer: { reviewerId: reviewerId, status: reviewer.status },
      });
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, {
        message: "Server error",
        error: error.message,
      });
    }
  }

  static async deleteMyReviewer(req, res) {
    try {
      const developerId = req.user.id;
      const { reviewerId } = req.params;
      await ReviewService.deleteReviewer({
        reviewerId,
        developerId,
      });
      return res.status(200).json({
        message: "Reviewer deleted successfully",
      });
    } catch (error) {
      console.log(error);
      return Response.error(res, 500, {
        message: error.message || "Server error",
      });
    }
  }
}
