/* eslint-disable no-useless-catch */
import DB from "./../database";
import { Op } from "sequelize";
const { RatingCategory } = DB;

export default class RatingCategoryService {
  static async createRatingCategory(param) {
    try {
      const ratingCategory = await RatingCategory.create(param);
      return ratingCategory;
    } catch (error) {
      throw error;
    }
  }

  static async findAllRatingCategories() {
    try {
      const ratingCategories = await RatingCategory.findAll();
      return ratingCategories;
    } catch (error) {
      throw error;
    }
  }

  static async checkRatingCategoryExists(name) {
    try {
      const ratingCategory = await RatingCategory.findOne({
        where: {
          name: {
            [Op.iLike]: name,
          },
        },
      });
      return ratingCategory;
    } catch (error) {
      throw error;
    }
  }

  static async findRatingCategoryById(id) {
    try {
      const ratingCategory = await RatingCategory.findByPk(id);
      return ratingCategory;
    } catch (error) {
      throw error;
    }
  }
}
