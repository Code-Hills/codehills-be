/* eslint-disable no-unused-vars */
// "use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserProjects", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      projectId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "Projects",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex("UserProjects", ["userId", "projectId"], {
      unique: true,
      name: "UserProject_unique_constraint",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      "UserProjects",
      "UserProject_unique_constraint"
    );
    await queryInterface.dropTable("UserProjects");
  },
};
