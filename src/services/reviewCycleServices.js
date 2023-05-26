import db from "./../database";
const { ReviewCycle } = db;

export default class ReviewCycleService {
  /**
   * Creates a new review cycle.
   * @param {object} param details of a review cycle.
   */

  static async create(param) {
    const review = await ReviewCycle.create(param);
    return review;
  }

  static async findONE(param) {
    const Reviews = await ReviewCycle.findOne({
      where: param,
    });
    return Reviews;
  }

  static async findAll() {
    const Reviews = await ReviewCycle.findAll();
    return Reviews;
  }

  static async findById(id) {
    const Review = await ReviewCycle.findByPk(id);
    return Review;
  }

  static async delete(id) {
    const review = await ReviewCycle.destroy(id);
    return review;
  }

  static async update(payload, condition) {
    const [rowCount] = await ReviewCycle.update(
      {
        ...payload,
      },
      condition
    );
    return rowCount;
  }
}
