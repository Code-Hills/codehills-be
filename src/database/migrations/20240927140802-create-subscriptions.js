'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Subscriptions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      tenantId: {
        type: Sequelize.UUID,
        references: {
          model: "Tenants",
          key: "id",
        },
      },
      planId: {
        type: Sequelize.UUID,
        references: {
          model: "Plans",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM("inactive", "active", "trial"),
        defaultValue: "trial"
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Subscriptions');
  }
};