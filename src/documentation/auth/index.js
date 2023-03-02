import responses from "../responses";

const auth = {
  "/auth/microsoft": {
    get: {
      tags: ["AUTH"],
      security: [{ JWT: [] }],
      summary: "Authanticated",
      parameters: [],
      consumes: ["application/json"],
      responses,
    },
  },
  "/auth/login": {
    post: {
      tags: ["AUTH"],
      summary: "Log in",
      parameters: [
        {
          in: "body",
          name: "body",
          required: true,
          schema: {
            example: {
              email: "email@example.com",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default auth;
