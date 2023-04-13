import db from "./../database";
const { Review } = db;

export default class ReviewService {
  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */

  static async create(param) {
    try {
      const review = await Review.create(param);
      return review;
    } catch (error) {
      throw error;
    }
  }

  static async findONE(param) {
    try {
      const Reviews = await Review.findOne({
        where: param,
      });
      return Reviews;
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const Reviews = await Review.findAll();
      return Reviews;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const Review = await Review.findByPk(id);
      return Review;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const review = await Review.destroy(id);
      return review;
    } catch (error) {
      throw error;
    }
  }
}
