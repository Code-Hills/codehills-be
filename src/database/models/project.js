/* eslint-disable no-unused-vars */
import { Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";
// import DB from "..";
// const { User, UserProject } = DB;

class Project extends Model {}

const ProjectModel = () => {
  Project.init(
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
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      projectLeadId: {
        type: DataTypes.UUID,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      startDate: {
        type: DataTypes.DATE,
      },
      endDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.ENUM("pending", "in-progress", "completed"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Project",
      tableName: "Projects",
    }
  );

  return Project;
};

export default ProjectModel;
