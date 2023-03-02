// const data = require('./feeds/users')

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert(
      "tbl_users",
      [
        {
          id: "d862ce77-1067-478c-94e3-99e8cb0a877e",
          firstName: "Emmanuel",
          lastName: "NKUBITO",
          email: "codehill@admin.com",
          telephone: "+250788888888",
          country: "rwanda",
          role: "admin",
          avatar: "https://www.images.com/avatar-12ddee-213-csd",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("tbl_users", null, {}),
};
