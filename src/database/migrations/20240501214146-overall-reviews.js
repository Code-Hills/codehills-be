"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tbl_overall_reviews", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      reviewerId: {
        type: Sequelize.UUID,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      revieweeId: {
        type: Sequelize.UUID,
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      reviewCycleId: {
        type: Sequelize.UUID,
        references: {
          model: "tbl_review_cycles",
          key: "id",
        },
      },
      isReviewd: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      type: {
        type: Sequelize.STRING,
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

  down: async (queryInterface) => {
    await queryInterface.dropTable("tbl_overall_reviews");
  },
};
