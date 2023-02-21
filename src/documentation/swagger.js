import dotenv from "dotenv";
dotenv.config();

export default {
  openapi: "3.0.0",
  info: {
    title: "CodeHills HR API",
    version: "1.0.0",
    description: "CodeHills HR API documentation",
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 4000}/api`,
    },
  ],
  paths: {
    "/users": {
      get: {
        summary: "Gets all users in the database",
        tags: ["User"],
        responses: {
          200: {
            description: "Users retrieved successfully",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
    "/users/add": {
      post: {
        summary: "Adds a user into the database",
        tags: ["Auth"],
        requestBody: {
          description: "User details",
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  firstName: {
                    type: "string",
                  },
                  lastName: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  password: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "User added successfully",
          },
          400: {
            description: "Invalid request body",
          },
          500: {
            description: "Server error",
          },
        },
      },
    },
  },
};
