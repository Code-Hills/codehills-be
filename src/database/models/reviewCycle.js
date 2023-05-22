/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class ReviewCycle extends Model {}

const ReviewCycleModel = () => {
  ReviewCycle.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      startAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      endingAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      started: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      ended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "ReviewCycle",
      tableName: "tbl_review_cycles",
    }
  );

  return ReviewCycle;
};

export default ReviewCycleModel;
