import responses from "../responses";

const ratingCategories = {
  "/ratingCategories": {
    get: {
      tags: ["RatingCategories"],
      summary: "Get all rating categories",
      description:
        "Get all categories. Only admin users can get a list of all categories.",
      security: [{ JWT: [] }],
      parameters: [],
      consumes: ["application/json"],
      responses,
    },
    post: {
      tags: ["RatingCategories"],
      summary: "Create a new rating category",
      description:
        "Create a new project. Only admin users can create categories.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "body",
          name: "body",
          required: true,
          schema: {
            example: {
              name: "Rating category name",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },

  "/ratingCategories/{id}": {
    get: {
      tags: ["RatingCategories"],
      summary: "Get a rating category",
      description: "Get one rating category with its rating fields.",
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
      tags: ["RatingCategories"],
      summary: "Change category name",
      description: "Change rating category name",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            example: "566febd2-d3f3-4ae3-ac76-a5ef5426366d",
          },
        },
        {
          in: "body",
          name: "body",
          required: true,
          schema: {
            example: {
              name: "New Name",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
    delete: {
      tags: ["RatingCategories"],
      summary: "Delete a rating category",
      description: "Delete a rating category. it will delete its rating fields",
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

export default ratingCategories;
