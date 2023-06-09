const reviewCycles = [
  {
    id: "c1c656af-f5c2-40d6-bb4c-0bc12d79b1be",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-10-31"),
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4362a0f3-3efb-43ca-ac52-6460bdfba0d5",
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-08-28"),
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: (queryInterface) =>
    queryInterface.bulkInsert("tbl_review_cycles", reviewCycles, {}),

  down: (queryInterface) =>
    queryInterface.bulkDelete("tbl_review_cycles", null, {}),
};
