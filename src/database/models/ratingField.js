import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class RatingField extends Model {}

const RatingFieldModel = () => {
  RatingField.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        references: {
          model: "tbl_rating_categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "RatingField",
      tableName: "tbl_rating_fields",
      timestamps: true,
    }
  );

  return RatingField;
};

export default RatingFieldModel;
