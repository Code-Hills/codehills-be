const reviewers = [
  {
    id: "d862ce77-1067-478c-94e3-99e8cb0a855d",
    developerId: "d862ce77-1067-478c-94e3-99e8cb0a877d",
    reviewerId: "d862ce77-1067-478c-94e3-99e8cb0a877c",
    reviewCycleId: "4362a0f3-3efb-43ca-ac52-6460bdfba0d5",
    status: "approved",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "d862ce77-1067-478c-94e3-99e8cb0a888c",
    developerId: "d862ce77-1067-478c-94e3-99e8cb0a877c",
    reviewerId: "d862ce77-1067-478c-94e3-99e8cb0a877d",
    reviewCycleId: "4362a0f3-3efb-43ca-ac52-6460bdfba0d5",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("Reviewers", reviewers, {}),

  down: (queryInterface) => queryInterface.bulkDelete("Reviewers", null, {}),
};
