/* eslint-disable no-unused-vars */
import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/sequelize";
export class User extends Model {}

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
        default: "developer",
      },
      isLoggedIn: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "tbl_users",
      timestamps: true,
      sequelize, // passing the `sequelize` instance is required
    }
  );
  return User;
};

export default UserModel;
