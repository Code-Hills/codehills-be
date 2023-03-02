import sequelize from "./config/sequelize";
import UserModel from "./models/user.model";

const DB = {
  sequelize, // connection instance (RAW queries)
  User: UserModel(sequelize),
};

export default DB;
