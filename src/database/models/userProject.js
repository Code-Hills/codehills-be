// /* eslint-disable no-unused-vars */
// import { Model, DataTypes } from "sequelize";
// import sequelize from "../config/sequelize";

// // class UserProject extends Model {}

// // const userProjectModel = () => {
// const UserProject = sequelize.define(
//   "UserProject",
//   // UserProject.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     userId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: "tbl_users",
//         key: "id",
//       },
//     },
//     projectId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//       references: {
//         model: "Projects",
//         key: "id",
//       },
//     },
//   },
//   {
//     sequelize,
//     modelName: "UserProject",
//   }
// );
// //   return UserProject;
// // };

// // export default userProjectModel;
