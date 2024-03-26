import responses from "../responses";

const notification = {
  "/notification": {
    get: {
      tags: ["Notification"],
      security: [{ JWT: [] }],
      summary: "get notifications",
      parameters: [
        {
          in: "query",
          name: "page",
          required: false,
          schema: {
            example: "",
          },
        },
        {
          in: "query",
          name: "limit",
          required: false,
          description: "limit can be any positive number greater than 0",
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

export default notification;
