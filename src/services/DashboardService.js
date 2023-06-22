import DB from "../database";

export default class DashboardService {
  static getDashboard = async (user) => {
    const userId = user.id;
    const userRole = user.role;
    console.log("userRole", userRole);
    const dashboard = {
      recentProjects: [],
      totalDevelopers: 0,
      totalProjects: 0,
      totalReceivedReviews: 0,
      totalReviews: 0,
      totalReviewCycle: 0,
    };

    const isAdminOrArchitect = ["architect", "admin"].includes(userRole);

    const Project = isAdminOrArchitect ? DB.Project : DB.UserProject;

    dashboard.recentProjects = await Project.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      where: isAdminOrArchitect
        ? userRole === "admin"
          ? {}
          : { projectLeadId: userId }
        : { userId },
    });

    dashboard.totalDevelopers = await DB.User.count({
      where: { role: "developer" },
    });

    dashboard.totalProjects = await DB.Project.count({
      where: isAdminOrArchitect
        ? userRole === "admin"
          ? {}
          : { projectLeadId: userId }
        : { userId },
    });

    dashboard.totalReceivedReviews = await DB.Review.count({
      where: userRole === "admin" ? {} : { revieweeId: userId },
    });

    dashboard.totalReviews = await DB.Review.count({
      where: userRole === "admin" ? {} : { reviewerId: userId },
    });

    dashboard.totalReviewCycle = await DB.ReviewCycle.count();

    return dashboard;
  };
}
