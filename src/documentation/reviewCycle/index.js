import responses from "../responses";

const reviewCycles = {
  "/reviewCycles": {
    post: {
      tags: ["ReviewCycles"],
      summary: "Create new reviewCycles",
      description: "Create new reviewCycles.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "body",
          name: "body",
          required: true,
          schema: {
            example: {
              startDate: "2023-09-23",
              endDate: "2023-12-31",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
    get: {
      tags: ["ReviewCycles"],
      summary: "Get all reviewCycles",
      description:
        "Get all reviewCycles. Only admin users can get a list of all reviewCycles.",
      security: [{ JWT: [] }],
      parameters: [],
      consumes: ["application/json"],
      responses,
    },
  },

  "/reviewCycles/{id}": {
    get: {
      tags: ["ReviewCycles"],
      summary: "Get one review cycle",
      description: "Get one review cycle.",
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
    put: {
      tags: ["ReviewCycles"],
      summary: "Update a review",
      description:
        "Update a review cycle. Only admin users can update a review cycle.",
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
              startDate: "2023-09-20",
              endDate: "2024-01-15",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
    delete: {
      tags: ["ReviewCycles"],
      summary: "Delete a review",
      description: "Delete a review cycle.",
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
  "/reviewCycles/start/{id}": {
    put: {
      tags: ["ReviewCycles"],
      summary: "start a review",
      description: "start a review cycle.",
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
  "/reviewCycles/end/{id}": {
    put: {
      tags: ["ReviewCycles"],
      summary: "End a review",
      description: "End a review cycle.",
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

export default reviewCycles;
