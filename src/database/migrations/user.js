/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
      },
      microsoftId: {
        type: Sequelize.UUID,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      displayName: {
        type: Sequelize.STRING,
      },
      telephone: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM("developer", "manager", "architect", "admin"),
        default: "developer",
      },
      isLoggedIn: {
        type: Sequelize.BOOLEAN,
        default: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_users");
  },
};
