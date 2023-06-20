import DB from "../database";

export default class DashboardService {
  static getDashboard = async (user) => {
    const userId = user.id;
    const userRole = user.role;
    const dashboard = {
      recentProjects: [],
      totalDevelopers: 0,
      totalProjects: 0,
      totalReceivedReviews: 0,
      totalReviews: 0,
      totalReviewCycle: 0,
    };

    const Project = userRole === "admin" ? DB.Project : DB.UserProject;

    dashboard.recentProjects = await Project.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      where: userRole === "admin" ? {} : { userId },
    });

    dashboard.totalDevelopers = await DB.User.count({
      where: { role: "developer" },
    });

    dashboard.totalProjects = await DB.Project.count({
      where: userRole === "admin" ? {} : { userId },
    });

    dashboard.totalReceivedReviews = await DB.Review.count({
      where: userRole === "admin" ? {} : { revieweeId: userId },
    });

    dashboard.totalReviews = await DB.Review.count({
      where: userRole === "admin" ? {} : { reivewerId: userId },
    });

    dashboard.totalReviewCycle = await DB.ReviewCycle.count();

    return dashboard;
  };
}
