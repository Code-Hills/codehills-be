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

  "/users/{developerId}/reviews/{reviewCyleId}": {
    get: {
      tags: ["Reviews"],
      summary: "Get all reviews given to a developer",
      description: "Get all reviews given to a developer",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "reviewCyleId",
          required: true,
          schema: {
            type: "string",
            example: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
          },
        },
        {
          in: "path",
          name: "developerId",
          required: true,
          schema: {
            type: "string",
            example: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
          },
        },
      ],
      consumes: ["application/json"],
      responses: {},
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

  "/users/reviewers": {
    post: {
      tags: ["Reviews"],
      summary: "Select a peer reviewer",
      description: "You can not select more than two reviewers",
      security: [{ JWT: [] }],
      parameters: [
        {
          name: "body",
          in: "body",
          description: "The ID of the reviewer to select",
          required: true,
          schema: {
            example: {
              reviewerId: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
              reviewCycleId: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },

  "/users/reviewers/{reviewerId}": {
    delete: {
      tags: ["Reviews"],
      summary: "Delete my peer reviewer",
      security: [{ JWT: [] }],
      parameters: [
        {
          name: "reviewerId",
          in: "path",
          description: "The ID of the reviewer to delete",
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

  "/users/reviewers/{reviewCyleId}": {
    get: {
      tags: ["Reviews"],
      summary: "Get all reviewers for a developer",
      description: "Get all reviewers for a developer.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "query",
          name: "developerId",
          required: false,
          schema: {
            type: "string",
            example: "",
          },
        },
        {
          in: "query",
          name: "status",
          required: false,
          schema: {
            type: "string",
            example: "approved",
          },
        },
        {
          in: "path",
          name: "reviewCyleId",
          required: true,
          schema: {
            type: "string",
            example: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
          },
        },
      ],
      consumes: ["application/json"],
      responses: {},
    },
  },

  "/reviews/{reviewCyleId}/reviewers/": {
    get: {
      tags: ["Reviews"],
      summary: "Get all reviewers for the selected review cycle",
      description: "Get all reviewers for the selected review cycle.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "reviewCyleId",
          required: true,
          schema: {
            type: "string",
            example: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
          },
        },
      ],
      consumes: ["application/json"],
      responses: {},
    },
  },

  "/reviews/{reviewCyleId}/reviewers/": {
    get: {
      tags: ["Reviews"],
      summary: "Get all reviewers for the selected review cycle",
      description: "Get all reviewers for the selected review cycle.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "reviewCyleId",
          required: true,
          schema: {
            type: "string",
            example: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
          },
        },
      ],
      consumes: ["application/json"],
      responses: {},
    },
  },

  "/users/{developerId}/reviewers/approve": {
    patch: {
      tags: ["Reviews"],
      summary: "Approve a reviewer",
      description: "Only project lead/architect can approve/reject reviewers",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "developerId",
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
              reviewerId: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
              reviewCycleId: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },

  "/users/{developerId}/reviewers/reject": {
    patch: {
      tags: ["Reviews"],
      summary: "Reject a reviewer",
      description: "Only project lead/architect can approve/reject reviewers",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "developerId",
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
              reviewerId: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
              reviewCycleId: "8a2a4287-fd47-45f9-a1a0-42e24aeeeddz",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default reviews;
