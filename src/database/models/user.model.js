/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
import UserProject from "./UserProject";
import Project from "./project";
// import DB from "..";
// const { Project, UserProject } = DB;

// class User extends Model {}
const User = sequelize.define(
  "User",
  {
    // User.init(
    //   {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    displayName: DataTypes.STRING,
    avatar: DataTypes.STRING,
    microsoftId: DataTypes.UUID,
    role: {
      type: DataTypes.ENUM("developer", "manager", "architect", "admin"),
      default: "developer",
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }
  // {
  //   sequelize,
  //   modelName: "User",
  //   tableName: "tbl_users",
  //   timestamps: true,
  // }
);

// User.belongsToMany(Project, {
//   through: UserProject,
//   foreignKey: "userId",
//   otherKey: "projectId",
// });

User.belongsToMany(Project, { through: UserProject });

//   return User;
// };

// export default UserModel;
