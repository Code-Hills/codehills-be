'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tenants = sequelize.define('Tenants', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: DataTypes.STRING,
    subdomain: DataTypes.STRING
  }, {});
  Tenants.associate = function(models) {
    // associations can be defined here
  };
  return Tenants;
};