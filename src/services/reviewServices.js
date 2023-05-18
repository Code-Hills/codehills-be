/* eslint-disable no-useless-catch */
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

  static async findReviewer(reviewerId, developerId) {
    try {
      const reviewer = await Reviewer.findOne({
        where: {
          reviewerId: reviewerId,
          developerId: developerId,
        },
      });
      return reviewer;
    } catch (error) {
      throw error;
    }
  }

  static async findAllReviewers(developerId) {
    try {
      const reviewers = await Reviewer.findAll({
        where: {
          developerId: developerId,
        },
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

  static async getReviewers(developerId) {
    const reviewers = await Reviewer.findAll({
      where: { developerId },
      attributes: ["status"],
      include: [
        {
          model: User,
          as: "reviewer",
          attributes: ["id", "firstName", "lastName", "email", "role"],
        },
      ],
    });

    return reviewers;
  }
}
