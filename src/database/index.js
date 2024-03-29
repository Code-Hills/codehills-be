import sequelize from "./config/sequelize";
import UserModel from "./models/user.model";
import ProjectModel from "./models/project";
import UserProject from "./models/userProject";
import NotificationModel from "./models/notification";
import BlacklistedTokenModel from "./models/blacklistedToken";
import ReviewModel from "./models/review";
import ReviewCycleModel from "./models/reviewCycle";
import reviewerModel from "./models/reviewer";

const DB = {
  sequelize, // connection instance (RAW queries)
  User: UserModel(sequelize),
  Project: ProjectModel(sequelize),
  UserProject: UserProject(sequelize),
  Notification: NotificationModel(sequelize),
  BlacklistedToken: BlacklistedTokenModel(sequelize),
  Review: ReviewModel(sequelize),
  ReviewCycle: ReviewCycleModel(sequelize),
  Reviewer: reviewerModel(sequelize),
};

export default DB;
