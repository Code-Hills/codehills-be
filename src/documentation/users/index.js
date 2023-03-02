import responses from "../responses";

const users = {
  "/users": {
    post: {
      tags: ["Users"],
      security: [],
      summary: "Register as User",
      parameters: [
        {
          in: "body",
          name: "body",
          required: true,
          schema: {
            example: {
              firstName: "Eric",
              lastName: "Kalisa",
              country: "Rwanda",
              telephone: "0788878788",
              email: "admin@rinda.com",
              avatar: "https//www.images.com/12313123da",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
    get: {
      tags: ["Users"],
      security: [],
      summary: "get all Users",
      parameters: [],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default users;
