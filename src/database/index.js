import sequelize from "./config/sequelize";
import UserModel from "./models/user.model";
import ProjectModel from "./models/project";
import UserProject from "./models/userProject";
import NotificationModel from "./models/notification";
import BlacklistedTokenModel from "./models/blacklistedToken";
import OverallReviewModel from "./models/overallReview";
import ReviewCycleModel from "./models/reviewCycle";
import reviewerModel from "./models/reviewer";
import RatingCategoryModel from "./models/ratingCategory";
import RatingFieldModel from "./models/ratingField";
import FieldReviewModel from "./models/fieldReview";

const DB = {
  sequelize, // connection instance (RAW queries)
  User: UserModel(sequelize),
  Project: ProjectModel(sequelize),
  UserProject: UserProject(sequelize),
  Notification: NotificationModel(sequelize),
  BlacklistedToken: BlacklistedTokenModel(sequelize),
  OverallReview: OverallReviewModel(sequelize),
  ReviewCycle: ReviewCycleModel(sequelize),
  Reviewer: reviewerModel(sequelize),
  RatingCategory: RatingCategoryModel(sequelize),
  RatingField: RatingFieldModel(sequelize),
  FieldReview: FieldReviewModel(sequelize),
};

export default DB;
