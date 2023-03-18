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
          microsoftId: "410377e1-8bdd-41fa-b5c6-286cf1ae1ed3",
          email: "codehill@admin.com",
          telephone: "+250788888888",
          displayName: "Emmanuel NKUBITO",
          role: "admin",
          isActivated: true,
          avatar: "https://www.images.com/avatar-12ddee-213-csd",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d862ce77-1067-478c-94e3-99e8cb0a877d",
          firstName: "John",
          lastName: "Doe",
          microsoftId: "410377e1-8bdd-41fa-b5c6-286cf1ae1ed3",
          email: "jdoe@example.com",
          telephone: "+250788884444",
          displayName: "Doe",
          role: "developer",
          isActivated: true,
          avatar: "https://www.images.com/avatar-12ddee-213-csd",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d862ce77-1067-478c-94e3-99e8cb0a877c",
          firstName: "Jane",
          lastName: "Doe",
          microsoftId: "410377e1-8bdd-41fa-b5c6-286cf1ae1ed3",
          email: "janedoe@example.com",
          telephone: "+250788884444",
          displayName: "Jane Doe",
          role: "developer",
          isActivated: false,
          avatar: "https://www.images.com/avatar-12ddee-213-csd",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d862ce77-1067-478c-94e3-99e8cb0a877b",
          firstName: "Patrick",
          lastName: "Nshimiyimana",
          microsoftId: "410377e1-8bdd-41fa-b5c6-286cf1ae1ed3",
          email: "patrickn@example.com",
          telephone: "+250788884444",
          displayName: "Doe",
          role: "architect",
          avatar: "https://www.images.com/avatar-12ddee-213-csd",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface) => queryInterface.bulkDelete("tbl_users", null, {}),
};
