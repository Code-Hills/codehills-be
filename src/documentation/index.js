import dotenv from "dotenv";
import swaggerDoc from "./swagger.json";
import user from "./users";
import auth from "./auth";
import projects from "./projects";
import reviews from "./review";
import reviewCycles from "./reviewCycle";
import search from "./search";
import dashboard from "./auth/dashboard";
import ratingCategories from "./ratingCategory";
import ratingFields from "./ratingField";

const defaults = swaggerDoc.paths;

dotenv.config();

const host =
  process.env.NODE_ENV === "production"
    ? process.env.HOST.split("https://")[1]
    : process.env.HOST.split("http://")[1];

  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

const paths = {
  ...defaults,
  ...auth,
  ...dashboard,
  ...user,
  ...projects,
  ...reviewCycles,
  ...reviews,
  ...search,
  ...ratingCategories,
  ...ratingFields,
};

const config = {
  openapi: "3.0.0", 
  info: {
    title: "CodeHills HR API",
    version: "1.0.0",
    description: "CodeHills HR API documentation",
  },
  servers: [
    {
      url: `${protocol}://{subdomain}.${host}/api/v1`,
      variables: {
        subdomain: {
          default: "test",
          description: "Subdomain assigned by the service provider",
        },
        port: {
          enum: ["443", "8443", "80","2023"],
          default: "2023",
        },
      },
    },
  ],
  components: {
    securitySchemes: {
      JWT: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description: "Enter your JWT token in the format 'Bearer token'.",
      },
    },
  },
  security: [
    {
      JWT: [],
    },
  ],
  paths, 
};

export default config;
