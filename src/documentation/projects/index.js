import responses from "../responses";

const projects = {
  "/projects": {
    get: {
      tags: ["Projects"],
      summary: "Get all projects",
      description:
        "Get all projects. Only admin users can get a list of all projects.",
      security: [{ JWT: [] }],
      parameters: [],
      consumes: ["application/json"],
      responses,
    },
  },

  "/projects/create": {
    post: {
      tags: ["Projects"],
      summary: "Create a new project",
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
              name: "Project name",
              description: "Project description",
              startDate: "2023-03-20",
              endDate: "2023-03-28",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },

  "/projects/{projectId}": {
    get: {
      tags: ["Projects"],
      summary: "Get a project",
      description: "Get one project.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "projectId",
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
      tags: ["Projects"],
      summary: "Update a project",
      description: "Update a project. Only admin users can update a project.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "projectId",
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
              name: "Project name",
              description: "Project description",
              startDate: "2023-03-09T13:33:43.076Z",
              endDate: "2023-03-09T13:33:43.076Z",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
    delete: {
      tags: ["Projects"],
      summary: "Delete a project",
      description: "Delete a project. Only admin users can delete a project.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "projectId",
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

  "/projects/{projectId}/users": {
    get: {
      tags: ["Projects"],
      summary: "Get all users assigned on a project",
      description:
        "Get all users on a project. Only admin users can get a list of all users in a project.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "projectId",
          required: true,
          schema: {
            example: "566febd2-d3f3-4ae3-ac76-a5ef5426366d",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },

    put: {
      tags: ["Projects"],
      summary: "Add a user to a project",
      description:
        "Assign a user to a project. Only admin users can assign a user to a project.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "projectId",
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
              email: "johndoe@email.com",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
    delete: {
      tags: ["Projects"],
      summary: "Remove a user from a project",
      description:
        "Remove a user from a project. Only admin users can remove a user from a project.",
      security: [{ JWT: [] }],
      parameters: [
        {
          in: "path",
          name: "projectId",
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
              email: "johndoe@email.com",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default projects;
