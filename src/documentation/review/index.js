import responses from "../responses";

const reviews = {
  "/reviews": {
    post: {
      tags: ["Reviews"],
      summary: "Create new reviews",
      description: "Create new reviews.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "body",
          name: "body",
          required: true,
          schema: {
            example: {
              revieweeId: "5e5bb69e-26fe-4e61-b4f3-e9a9332066da",
              reviewCycleId: "5e5bb69e-26fe-4e61-b4f3-e9a9332066da",
              description: "review description",
              ratings: 2,
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
    get: {
      tags: ["Reviews"],
      summary: "Get all reviews",
      description:
        "Get all reviews. Only admin users can get a list of all reviews.",
      security: [{ JWT: [] }],
      parameters: [],
      consumes: ["application/json"],
      responses,
    },
  },

  "/reviews/{id}": {
    get: {
      tags: ["Reviews"],
      summary: "Get one review",
      description: "Get one review.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            example: "5e5bb69e-26fe-4e61-b4f3-e9a9332066da",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
    patch: {
      tags: ["Reviews"],
      summary: "Update a review",
      description: "Update a review. Only admin users can update a review.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            example: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
          },
        },
        {
          in: "body",
          name: "body",
          required: true,
          schema: {
            example: {
              description: "review description update",
              ratings: 4,
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
    delete: {
      tags: ["Reviews"],
      summary: "Delete a review",
      description: "Delete a review.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            example: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default reviews;
