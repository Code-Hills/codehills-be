/* eslint-disable no-useless-catch */
import DB from "./../database";
import { Op } from "sequelize";
const { RatingField } = DB;

export default class RatingFieldService {
  static async createRatingField(param) {
    try {
      const ratingField = await RatingField.create(param);
      return ratingField;
    } catch (error) {
      throw error;
    }
  }

  static async findAllRatingFields() {
    try {
      const ratingCategories = await RatingField.findAll();
      return ratingCategories;
    } catch (error) {
      throw error;
    }
  }

  static async checkRatingFieldExists(name, categoryId) {
    try {
      const ratingField = await RatingField.findOne({
        where: {
          name: {
            [Op.iLike]: name,
          },
          categoryId,
        },
      });
      return ratingField;
    } catch (error) {
      throw error;
    }
  }

  static async findRatingFieldById(id) {
    try {
      const ratingField = await RatingField.findByPk(id);
      return ratingField;
    } catch (error) {
      throw error;
    }
  }
}
