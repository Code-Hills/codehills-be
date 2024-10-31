import responses from "../responses";

const tenants = {
    "/tenants": {
        post: {
            tags: ["Tenants"],
            security: [{ JWT: [] }],
            summary: "Create a tenant",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    required: true,
                    schema: {
                        example: {
                            name: "test"
                        },
                    },
                },
            ],
            consumes: ["application/json"],
            responses,
        },
        get: {
            tags: ["Tenants"],
            security: [{ JWT: [] }],
            summary: "get all Tenants",
            parameters: [],
            consumes: ["application/json"],
            responses,
        },
    },
    "/tenants/{id}": {
        get: {
            tags: ["Tenants"],
            security: [{ JWT: [] }],
            summary: "Get tenant by ID",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    type: "string",
                    description: "Tenant ID"
                }
            ],
            consumes: ["application/json"],
            responses,
        },
        put: {
            tags: ["Tenants"],
            security: [{ JWT: [] }],
            summary: "Update a tenant",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    required: true,
                    schema: {
                        example: {
                            name: "test"
                        },
                    },
                }
            ],
            consumes: ["application/json"],
            responses,
        },
        delete: {
            tags: ["Tenants"],
            security: [{ JWT: [] }],
            summary: "Delete a tenant",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    type: "string",
                    description: "Tenant ID"
                }
            ],
            consumes: ["application/json"],
            responses,
        },
    },

};

export default tenants;
