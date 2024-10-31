import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class RatingCategory extends Model {}

const RatingCategoryModel = () => {
  RatingCategory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      tenantId: {
        type: DataTypes.UUID,
        references: {
          model: "Tenants",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "RatingCategory",
      tableName: "tbl_rating_categories",
      timestamps: true,
    }
  );
  return RatingCategory;
};

export default RatingCategoryModel;
