/* eslint-disable no-unused-vars */
import DB from "../";

export const associate = () => {
  DB.User.belongsToMany(DB.Project, {
    through: DB.UserProject, // you can pass a string "UserProject" or a model
    foreignKey: "userId",
    otherKey: "projectId",
  });

  DB.Project.belongsToMany(DB.User, {
    through: DB.UserProject,
    foreignKey: "projectId",
    otherKey: "userId",
  });

  DB.User.hasMany(DB.Review, {
    foreignKey: "reviewerId",
  });
  DB.User.hasMany(DB.Review, {
    foreignKey: "revieweeId",
  });

  DB.Review.belongsTo(DB.User, {
    foreignKey: "reviewerId",
    as: "reviewer",
  });
  DB.Review.belongsTo(DB.User, {
    foreignKey: "revieweeId",
    as: "reviewee",
  });
};
