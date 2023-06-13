import responses from "../responses";

const search = {
  "/search/users": {
    get: {
      tags: ["Search"],
      security: [{ JWT: [] }],
      summary: "Search for users",
      parameters: [
        {
          in: "query",
          name: "searchTerm",
          required: false,
          schema: {
            example: "",
          },
        },
        {
          in: "query",
          name: "role",
          required: false,
          description: "role can be 'developer' or 'architect'",
          schema: {
            example: "",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default search;
