import NotificationService from "../../services/notificationService";

export const receivedPaginationFormat = async (req, res, next) => {
  req.query = {
    limit: req.query["limit"] || "10",
    page: req.query["page"] || "1",
  };
  next();
};

export const checkIfHasNotificationId = async (req, res, next) => {
  const notification = await NotificationService.getNotifications(
    {
      id: req.params.notificationId,
    },
    null,
    null
  );
  if (notification.rows.length === 0) {
    return res.status(404).json({ message: "Notification not found" });
  }
  next();
};
