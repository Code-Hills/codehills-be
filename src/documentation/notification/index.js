import responses from "../responses";

const notification = {
  "/notification": {
    get: {
      tags: ["Notifications"],
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

  "/notification/{notificationId}": {
    patch: {
      tags: ["Notifications"],
      security: [{ JWT: [] }],
      summary: "Update User notifications",
      parameters: [
        {
          name: "notificationId",
          in: "path",
          description: "Id of the notification to be updated",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default notification;
