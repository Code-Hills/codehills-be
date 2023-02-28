import responses from "../responses";

const auth = {
  "/auth/microsoft": {
    get: {
      tags: ["AUTH"],
      security: [],
      summary: "Authanticated",
      parameters: [],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default auth;
