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
              email: "codehill@admin.com",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/auth/logout": {
    post: {
      tags: ["AUTH"],
      security: [{ JWT: [] }],
      summary: "Log out",
      parameters: [],
      consumes: ["application/json"],
      responses,
    },
  },
  "/profile": {
    get: {
      tags: ["AUTH"],
      security: [{ JWT: [] }],
      summary: "get user profile",
      parameters: [],
      consumes: ["application/json"],
      responses,
    },

    put: {
      tags: ["AUTH"],
      security: [{ JWT: [] }],
      summary: "update user profile",
      parameters: [
        {
          in: "formData",
          name: "firstName",
          type: "string",
          schema: {
            example: "Bull",
          },
        },
        {
          in: "formData",
          name: "lastName",
          type: "string",
          schema: {
            example: "Dog",
          },
        },
        {
          in: "formData",
          name: "displayName",
          type: "string",
          schema: {
            example: "thunderZeye",
          },
        },
        {
          in: "formData",
          name: "avatar",
          type: "file",
        },
        {
          in: "formData",
          name: "address",
          type: "object",
          schema: {
            example: {
              country: "Rwanda",
              city: "kigali",
              street: "KK4Ave",
            },
          },
        },
        {
          in: "formData",
          name: "bank",
          type: "object",
          schema: {
            example: {
              accountName: "Saving",
              BankName: "BK Rwanda",
              SwiftCode: "009",
              Currency: "Rwf",
            },
          },
        },
        {
          in: "formData",
          name: "gender",
          type: "string",
          schema: {
            example: "Male",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default auth;
