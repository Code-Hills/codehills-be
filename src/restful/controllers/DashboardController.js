import DashboardService from "../../services/DashboardService";

export default class DashboardController {
  static getDashboard = async (req, res) => {
    try {
      const dashboard = await DashboardService.getDashboard(req.user);

      res.status(200).json({ message: "Dashboard", data: dashboard });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
}
