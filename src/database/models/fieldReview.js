import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class FieldReview extends Model {}

const FieldReviewModel = () => {
  FieldReview.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      ratingFieldId: {
        type: DataTypes.UUID,
        references: {
          model: "tbl_rating_fields",
          key: "id",
        },
      },
      ratings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "FieldReview",
      tableName: "tbl_field_reviews",
      timestamps: true,
    }
  );

  return FieldReview;
};

export default FieldReviewModel;
