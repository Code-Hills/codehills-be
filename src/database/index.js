import sequelize from "./config/sequelize";
import UserModel from "./models/user.model";
import ProjectModel from "./models/project";
import UserProject from "./models/userProject";
import NotificationModel from "./models/notification";
import BlacklistedTokenModel from "./models/blacklistedToken";

const DB = {
  sequelize, // connection instance (RAW queries)
  User: UserModel(sequelize),
  Project: ProjectModel(sequelize),
  UserProject: UserProject(sequelize),
  Notification: NotificationModel(sequelize),
  BlacklistedToken: BlacklistedTokenModel(sequelize),
};

export default DB;
