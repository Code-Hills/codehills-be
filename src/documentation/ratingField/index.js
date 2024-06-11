import responses from "../responses";

const ratingFields = {
  "/ratingFields": {
    get: {
      tags: ["RatingFields"],
      summary: "Get all rating fields",
      description:
        "Get all projects. Only admin users can get a list of all projects.",
      security: [{ JWT: [] }],
      parameters: [],
      consumes: ["application/json"],
      responses,
    },
    post: {
      tags: ["RatingFields"],
      summary: "Create a new rating field",
      description:
        "Create a new project. Only admin users can create projects.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "body",
          name: "body",
          required: true,
          schema: {
            example: {
              categoryId: "41dcfb3c-9c7f-4829-9752-f0e1694fd6ea",
              name: "Rating field name",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },

  "/ratingFields/{id}": {
    get: {
      tags: ["RatingFields"],
      summary: "Get a rating field",
      description: "Get one rating field with its rating fields.",
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
    delete: {
      tags: ["RatingFields"],
      summary: "Delete a rating field",
      description: "Delete a rating field. it will delete its rating fields",
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

export default ratingFields;
