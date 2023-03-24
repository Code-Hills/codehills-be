/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import db from "./../database";
const { Notification } = db;

export default class notificationService {
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
}
