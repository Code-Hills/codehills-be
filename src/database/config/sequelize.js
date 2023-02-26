import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { NODE_ENV, DATABASE_URL, DEV_DATABASE_URL, TEST_DATABASE_URL } =
  process.env;

let url =
  NODE_ENV == "development"
    ? DEV_DATABASE_URL
    : NODE_ENV == "test"
    ? TEST_DATABASE_URL
    : DATABASE_URL;

const sequelize = new Sequelize(String(url), {
  timezone: "+09:00",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: false,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === "development",
  benchmark: true,
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "----------------------database connected successfully---------------------------"
    );
  })
  .catch((error) => {
    console.log(
      "***********************Database fails to connect because of ",
      error.message
    );
  });

export default sequelize;
