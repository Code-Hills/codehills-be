/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Projects",
      [
        {
          id: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddc",
          name: "Project 1",
          description: "This is the first project",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3e3cc1b4-d2e2-4d88-9c9e-aa6704b0e6fa",
          name: "Project 2",
          description: "This is the second project",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "829e56cc-7533-41f3-aee2-0c78e734e1c6",
          name: "Project 3",
          description: "This is the third project",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Projects", null, {});
  },
};
