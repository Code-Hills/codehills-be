/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Reviewer extends Model {}

const reviewerModel = () => {
  Reviewer.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      developerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      reviewerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Reviewer",
      tableName: "Reviewers",
    }
  );
  return Reviewer;
};

export default reviewerModel;
