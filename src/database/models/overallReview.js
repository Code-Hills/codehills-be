/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class OverallReview extends Model {}

const OverallReviewModel = () => {
  OverallReview.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      comment: {
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
      },
    },
    {
      sequelize,
      modelName: "OverallReview",
      tableName: "tbl_overall_reviews",
      timestamps: true,
    }
  );

  return OverallReview;
};

export default OverallReviewModel;
