import NotificationService from "../../services/notificationService";

export default class NotificationController {
  static async getNotifications(req, res) {
    try {
      const { limit, page } = req.query;
      const notifications = await NotificationService.getNotifications(
        { userId: req.user.id },
        limit,
        page
      );
      return res
        .status(200)
        .json({ message: "Fetched all notifications", notifications });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Failed to fetch notifications",
      });
    }
  }

  static async markOneNotification(req, res) {
    try {
      await NotificationService.updateNotifications(
        { read: true },
        { id: req.params.notificationId, userId: req.user.id }
      );

      return res
        .status(200)
        .json({ message: "Marked one notification as read" });
    } catch (err) {
      return res.status(500).json({
        error: err.message,
        message: "Failed to update the notification",
      });
    }
  }
}
