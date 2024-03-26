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
}
