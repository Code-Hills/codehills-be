/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

// import DB from "..";
// const { Project, UserProject } = DB;

class User extends Model {}
const UserModel = () => {
  User.init(
    {
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
        defaultValue: "developer",
      },
      isActivated: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      isLoggedIn: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "tbl_users",
      timestamps: true,
    }
  );

  return User;
};

export default UserModel;
