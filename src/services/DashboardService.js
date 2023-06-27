import { Op } from "sequelize";
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

    dashboard.totalProjects = await DB.UserProject.count({
      where: { userId },
    });

    const userProjects = await DB.UserProject.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
      where: { userId },
      include: [
        {
          model: DB.Project,
          as: "project",
        },
      ],
    });
    dashboard.recentProjects = userProjects.map(
      (userProject) => userProject.project
    );

    const userProjectIds = dashboard.recentProjects.map(
      (project) => project.id
    );

    if (userRole === "admin") {
      dashboard.recentProjects = await DB.Project.findAll({
        order: [["createdAt", "DESC"]],
        limit: 5,
      });
      dashboard.totalProjects = await DB.Project.count();
    } else if (userRole === "architect") {
      const where = {
        projectLeadId: {
          [Op.notIn]: userProjectIds,
        },
      };
      const leadProjects = await DB.Project.findAll({
        order: [["createdAt", "DESC"]],
        limit: 5,
        where,
      });
      dashboard.recentProjects = [
        ...dashboard.recentProjects,
        ...leadProjects,
      ].slice(0, 5);
      dashboard.totalProjects += await DB.Project.count({ where });
    }

    dashboard.totalDevelopers = await DB.User.count({
      where: { role: "developer" },
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
