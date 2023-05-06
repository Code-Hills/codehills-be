/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class BlacklistedToken extends Model {}

const BlacklistedTokenModel = () => {
  BlacklistedToken.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      blacklistedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "BlacklistedToken",
      tableName: "BlacklistedTokens",
    }
  );

  return BlacklistedToken;
};

export default BlacklistedTokenModel;
