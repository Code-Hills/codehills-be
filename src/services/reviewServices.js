/* eslint-disable no-useless-catch */
import { Op } from "sequelize";
import db from "./../database";
const { OverallReview, Reviewer, User, FieldReview, RatingField } = db;

export default class ReviewService {
  static async createReview(params) {
    const { comment, reviewerId, revieweeId, reviewCycleId, type } = params;
    try {
      const overallReview = await OverallReview.create({
        comment,
        reviewerId,
        revieweeId,
        reviewCycleId,
        type,
      });
      return overallReview;
    } catch (error) {
      throw error;
    }
  }

  static async createFieldReviews(params, overallReviewId) {
    try {
      const fieldReviews = await FieldReview.bulkCreate(
        params.map((fieldReview) => ({
          ...fieldReview,
          overallReviewId,
        }))
      );
      return fieldReviews;
    } catch (error) {
      throw error;
    }
  }

  static async findONE(param) {
    const Reviews = await OverallReview.findOne({
      where: param,
    });
    return Reviews;
  }

  static async findAll() {
    const Reviews = await OverallReview.findAll({
      include: [
        {
          model: User,
          as: "reviewer",
          attributes: ["displayName", "email", "role"],
        },
        {
          model: User,
          as: "reviewee",
          attributes: ["displayName", "email", "role"],
        },
        {
          model: FieldReview,
          as: "fieldReviews",
          attributes: ["id", "ratings"],
          include: [
            {
              model: RatingField,
              as: "ratingField",
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    return Reviews;
  }

  static async findById(id) {
    const Review = await OverallReview.findByPk(id);
    return Review;
  }

  static async delete(id) {
    const review = await OverallReview.destroy(id);
    return review;
  }

  static async findReviewer(reviewerId, developerId, reviewCycleId) {
    try {
      const reviewer = await Reviewer.findOne({
        where: {
          reviewerId: reviewerId,
          developerId: developerId,
          reviewCycleId,
        },
      });
      return reviewer;
    } catch (error) {
      throw error;
    }
  }

  static async findAllReviewers(developerId, reviewCycleId) {
    try {
      const reviewers = await Reviewer.findAll({
        where: {
          developerId: developerId,
          reviewCycleId: reviewCycleId,
        },
      });
      return reviewers;
    } catch (error) {
      throw error;
    }
  }

  static async getAllReviewers(reviewCycleId) {
    try {
      const reviewers = await Reviewer.findAll({
        where: {
          reviewCycleId: reviewCycleId,
        },
        include: [
          {
            model: db.User,
            as: "developer",
            attributes: [
              "id",
              "firstName",
              "lastName",
              "email",
              "displayName",
              "avatar",
              "telephone",
            ],
          },
          {
            model: db.User,
            as: "reviewer",
            attributes: [
              "id",
              "firstName",
              "lastName",
              "email",
              "displayName",
              "avatar",
              "telephone",
            ],
          },
        ],
      });
      return reviewers;
    } catch (error) {
      throw error;
    }
  }

  static async addReviewer(param) {
    try {
      const reviewer = await Reviewer.create(param);
      return reviewer;
    } catch (error) {
      throw error;
    }
  }

  static async getReviewers(developerId, reviewCycleId, status) {
    let where = {
      reviewCycleId,
    };
    if (status) {
      where.status = status;
    }

    if (developerId) {
      where = {
        ...where,
        [Op.or]: [{ reviewerId: developerId }, { developerId: developerId }],
      };
    }

    const reviewers = await Reviewer.findAll({
      where,
      attributes: [
        "status",
        "developerId",
        "reviewerId",
        "id",
        "reviewCycleId",
      ],
      include: [
        {
          model: User,
          as: "reviewer",
          attributes: ["id", "firstName", "lastName", "email", "role"],
        },
        {
          model: User,
          as: "developer",
          attributes: ["id", "firstName", "lastName", "email", "role"],
        },
      ],
    });

    return reviewers;
  }

  static async getReviews(developerId, reviewCycleId) {
    const givenReviews = await OverallReview.findAll({
      where: {
        reviewCycleId,
        reviewerId: developerId,
      },
      attributes: ["id", "description", "ratingz", "type"],
      include: [
        {
          model: User,
          as: "reviewee",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "role",
            "displayName",
            "avatar",
          ],
        },
      ],
    });

    const receivedReviews = await OverallReview.findAll({
      where: {
        reviewCycleId,
        revieweeId: developerId,
      },
      attributes: ["id", "description", "ratingz", "type"],
      include: [
        {
          model: User,
          as: "reviewer",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "role",
            "displayName",
            "avatar",
          ],
        },
      ],
    });

    return { givenReviews, receivedReviews };
  }

  static async deleteReviewer(param) {
    try {
      const reviewer = await Reviewer.findOne({
        where: param,
      });
      if (!reviewer) {
        throw new Error("Reviewer not found");
      }
      await reviewer.destroy();
      return reviewer;
    } catch (error) {
      throw error;
    }
  }
}
