/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import db from "./../database";
const { Notification, User } = db;

export default class NotificationService {
  /**
   * Creates a new message.
   * @param {object} param details of a message.
   * @returns {object} users new message.
   */

  static async createNotification(param) {
    try {
      const notification = await Notification.create(param);
      return notification;
    } catch (error) {
      throw error;
    }
  }

  static async getNotifications(query, limit, page) {
    const offset = (page - 1) * limit;

    const { count, rows } = await Notification.findAndCountAll({
      limit: limit,
      offset: offset,
      where: query,
      order: [["createdAt", "DESC"]],
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["bank", "microsoftId", "address"],
        },
      },
    });

    const totalPages = Math.ceil(count / limit);
    const currentPage = page;
    const totalItems = count;
    return { totalPages, currentPage, totalItems, rows };
  }
}

export const knownNotificationType = {
  projectCreated: "projectCreated",
  projectAssigned: "projectAssigned",
  projectCompleted: "projectCompleted",
};
