/* eslint-disable no-useless-catch */
import { Op } from "sequelize";
import db from "./../database";
const { Review, Reviewer, User } = db;

export default class ReviewService {
  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */

  static async create(param) {
    const review = await Review.create(param);
    return review;
  }

  static async findONE(param) {
    const Reviews = await Review.findOne({
      where: param,
    });
    return Reviews;
  }

  static async findAll() {
    const Reviews = await Review.findAll({
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
      ],
    });
    return Reviews;
  }

  static async findById(id) {
    const Review = await Review.findByPk(id);
    return Review;
  }

  static async delete(id) {
    const review = await Review.destroy(id);
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
    const givenReviews = await Review.findAll({
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

    const receivedReviews = await Review.findAll({
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
