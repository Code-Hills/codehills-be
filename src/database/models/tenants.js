import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Tenants extends Model { }

const TenantsModel = () => {
  Tenants.init(
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
        allowNull: false,
      },
      subdomain: {  
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Tenants",
      tableName: "Tenants",
      timestamps: true,
    }
  );

  return Tenants;
};

export default TenantsModel;
