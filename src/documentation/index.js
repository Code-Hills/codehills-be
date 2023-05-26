import dotenv from "dotenv";
import swaggerDoc from "./swagger.json";
import user from "./users";
import auth from "./auth";
import projects from "./projects";
import reviews from "./review";
import reviewCycles from "./reviewCycle";

const defaults = swaggerDoc.paths;

dotenv.config();

const host =
  process.env.NODE_ENV === "production"
    ? process.env.HOST.split("https://")[1]
    : process.env.HOST.split("http://")[1];

const paths = {
  ...defaults,
  ...auth,
  ...user,
  ...projects,
  ...reviewCycles,
  ...reviews,
};

const config = {
  swagger: "2.0",
  info: {
    title: "CodeHills HR API",
    version: "1.0.0",
    description: "CodeHills HR API documentation",
  },
  host,
  basePath: `/api/${process.env.API_VERSION || "v1"}`,
  schemes: ["http", "https"],
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "Enter your JWT token in the format 'Bearer token'.",
    },
  },
  tags: [
    {
      name: "CodeHills HR APIs Documentation",
    },
  ],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths,
};
export default config;
