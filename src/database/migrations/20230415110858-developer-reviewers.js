/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reviewers", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      developerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      reviewerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      reviewCycleId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reviewers");
  },
};
