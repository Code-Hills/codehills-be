"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tbl_field_reviews", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      ratingFieldId: {
        type: Sequelize.UUID,
        references: {
          model: "tbl_rating_fields",
          key: "id",
        },
      },
      overallReviewId: {
        type: Sequelize.UUID,
        references: {
          model: "tbl_overall_reviews",
          key: "id",
        },
      },
      ratings: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable("tbl_field_reviews");
  },
};
