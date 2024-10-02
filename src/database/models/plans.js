'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plans = sequelize.define('Plans', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.NUMBER,
    billingCycle: DataTypes.STRING,
    features: DataTypes.JSONB
  }, {});
  Plans.associate = function(models) {
    // associations can be defined here
  };
  return Plans;
};