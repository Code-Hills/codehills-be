/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Review extends Model {}

const ReviewModel = () => {
  Review.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      ratingz: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      reviewerId: {
        type: DataTypes.UUID,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      revieweeId: {
        type: DataTypes.UUID,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      reviewCycleId: {
        type: DataTypes.UUID,
        references: {
          model: "tbl_review_cycles",
          key: "id",
        },
      },
      type: {
        type: DataTypes.STRING,
        // allowNull: false
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
      modelName: "Review",
      tableName: "tbl_reviews",
    }
  );

  return Review;
};

export default ReviewModel;
