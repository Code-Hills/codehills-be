const reviews = [
  {
    id: "7f5bfebf-2681-4802-9fad-49834e6a2468",
    description: "Great product!",
    reviewerId: "d862ce77-1067-478c-94e3-99e8cb0a877d",
    revieweeId: "d862ce77-1067-478c-94e3-99e8cb0a877c",
    reviewCycleId: "4362a0f3-3efb-43ca-ac52-6460bdfba0d5",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "1cd9e490-a4ae-4c80-8c98-64342725d2bb",
    description: "Average experience.",
    reviewerId: "d862ce77-1067-478c-94e3-99e8cb0a877c",
    revieweeId: "d862ce77-1067-478c-94e3-99e8cb0a877d",
    reviewCycleId: "4362a0f3-3efb-43ca-ac52-6460bdfba0d5",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "d44a9330-6c5f-4f3b-8921-ab5a929c2523",
    description: "Great improvement!",
    reviewerId: "d862ce77-1067-478c-94e3-99e8cb0a877c",
    revieweeId: "d862ce77-1067-478c-94e3-99e8cb0a877d",
    reviewCycleId: "4362a0f3-3efb-43ca-ac52-6460bdfba0d5",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert("tbl_reviews", reviews, {}),

  down: (queryInterface) => queryInterface.bulkDelete("tbl_reviews", null, {}),
};
