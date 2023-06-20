import responses from "../responses";

const dashboard = {
  "/dashboard": {
    get: {
      tags: ["Dashboard"],
      security: [{ JWT: [] }],
      summary: "Get dashboard",
      parameters: [],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default dashboard;
