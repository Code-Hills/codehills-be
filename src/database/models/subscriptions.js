'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscriptions = sequelize.define('Subscriptions', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    tenantId: DataTypes.UUIDV4,
    planId: DataTypes.UUIDV4,
    status: {
      type: DataTypes.ENUM("inactive", "trial", "active"),
      defaultValue: "trial",
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {});
  Subscriptions.associate = function(models) {
    // associations can be defined here
  };
  return Subscriptions;
};