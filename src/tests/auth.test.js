/* eslint-disable no-undef */
import { request, use, expect } from "chai";
import chaiHttp from "chai-http";
import sinon from "sinon";
import app from "../app";
import UserService from "../services/userService";

use(chaiHttp);

const loginRoute = "/api/v1/auth/login";

describe("login tests", () => {
  it("should return a token on successful login", async () => {
    const user = { email: "jdoe@example.com" }; // this user must be in the seeds
    const res = await request(app).post(loginRoute).send(user);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
  });

  it("should return an error if user does not exist", async () => {
    const user = { email: "nonexistent@example.com" };
    const res = await request(app).post(loginRoute).send(user);

    expect(res).to.have.status(404);
    expect(res.body).to.have.property("message").equal("user not found!");
  });

  it("should return a server error if an unexpected error occurs", async () => {
    const user = { email: "example@example.com" };
    const stub = sinon
      .stub(UserService, "findOneUser")
      .throws(new Error("unexpected error"));
    const res = await request(app).post(loginRoute).send(user);

    expect(res).to.have.status(500);
    expect(res.body).to.have.property("message").equal("Server error");
    expect(res.body).to.have.property("error").equal("unexpected error");

    stub.restore();
  });
});

describe("Auth Middleware tests", () => {
  const protectedRoute = "/api/v1/users";
  it("should allow access to protected route if user is logged in", async () => {
    // login a user
    const user = { email: "codehill@admin.com" }; // this user must be and admin and in the seeds
    const loginRes = await request(app).post(loginRoute).send(user);
    const token = loginRes.body.token;

    // Make a request to a protected route using the generated token
    const res = await request(app)
      .get(protectedRoute)
      .set("Authorization", `Bearer ${token}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("message", "Retrieved all users");
  });

  //   it("should not allow access to protected route if user is not logged in", async () => {
  //     // login a user
  //     const loginRes = await request(app).post(loginRoute).send(user);
  //     const token = loginRes.body.token;

  //     // logout a user so that `isLoggedIn` is false

  //     // Make a request to a protected route using the generated token
  //     const res = await request(app)
  //       .get(protectedRoute)
  //       .set("Authorization", `Bearer ${token}`);

  //     expect(res).to.have.status(401);
  //     expect(res.body).to.have.property(
  //       "message",
  //       "Not Authorized, Not logged in"
  //     );
  //   });

  it("should not allow access to protected route without a token", async () => {
    // Make a request to a protected route without a token
    const res = await request(app).get(protectedRoute);

    expect(res).to.have.status(401);
    expect(res.body).to.have.property("message", "Not Authenticated!");
  });

  it("should not allow access to protected route with an invalid token", async () => {
    // Make a request to a protected route with an invalid token
    const res = await request(app)
      .get(protectedRoute)
      .set("Authorization", "Bearer invalidtoken");

    expect(res).to.have.status(401);
    expect(res.body).to.have.property("message", "Not Authorized!");
  });
});
