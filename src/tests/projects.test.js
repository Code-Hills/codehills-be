/* eslint-disable no-undef */
import { request, use, expect } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

use(chaiHttp);

describe("Projects Tests", () => {
  const loginRoute = "/api/v1/auth/login";
  const projectsRoute = "/api/v1/projects";
  let adminToken;
  let userToken;
  let project;
  before(async () => {
    // Get admin and user token before running tests
    // login an admin user
    const admin = { email: "codehill@admin.com" }; // this user must be an admin and in the seeds
    const res = await request(app).post(loginRoute).send(admin);
    adminToken = res.body.token;

    // login a user
    const user = { email: "jdoe@example.com" }; // this user must not be an admin and in the seeds
    const loginRes = await request(app).post(loginRoute).send(user);
    userToken = loginRes.body.token;

    // Create a project
    const projRes = await request(app)
      .post(`${projectsRoute}/create`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "New Project",
        description: "A new project created by admin user",
        startDate: "2023-03-10",
        endDate: "2023-04-10",
      });

    project = projRes.body.project;
  });

  describe("Project CRUD Tests", () => {
    it("should create a new project", async () => {
      request(app)
        .post(`${projectsRoute}/create`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({
          name: "Test Project",
          description: "A new project created by admin user",
          startDate: "2023-03-5",
          endDate: "2023-04-10",
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property(
            "message",
            "Project created successfully!"
          );
          expect(res.body).to.have.property("project");
        });
    });

    it("should return an 401 for non-admin users", async () => {
      request(app)
        .post(`${projectsRoute}/create`)
        .set("Authorization", `Bearer ${userToken}`)
        .send({
          name: "New Project",
          description: "A new project created by non-admin user",
          startDate: "2023-03-10",
          endDate: "2023-04-10",
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property(
            "message",
            "Not Authorized! Only admin can create projects"
          );
        });
    });

    it("should return all projects for an admin user", async () => {
      request(app)
        .get(projectsRoute)
        .set("Authorization", `Bearer ${adminToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property(
            "message",
            "All projects retrieved successfully!"
          );
          expect(res.body).to.have.property("projects");
        });
    });

    it("should return Not Authorized for a non-admin user", async () => {
      const res = await request(app)
        .get(projectsRoute)
        .set("Authorization", `Bearer ${userToken}`);
      // .end((err, res) => {
      expect(res).to.have.status(401);
      expect(res.body).to.be.an("object");
      expect(res.body).to.have.property(
        "message",
        "Not Authorized! Only admin can view all projects"
      );
      // });
    });
  });

  describe("Add Users to a project", () => {
    it("should return an error if project is not found", async () => {
      const nonExistId = "8a2a4287-fd47-45f9-a1a0-42e24aeeedda";
      // Make a request to add the user to a non-existing project
      const res = await request(app)
        .put(`${projectsRoute}/${nonExistId}/users`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ email: "jdoe@example.com" });

      expect(res).to.have.status(404);
      expect(res.body).to.have.property("error").to.equal("Project not found");
    });

    it("should return an error if user is not found", async () => {
      // Make a request to add the user to a non-existing project
      const res = await request(app)
        .put(`${projectsRoute}/${project.id}/users`)
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ email: "nonesxistentuser@example.com" });

      expect(res).to.have.status(404);
      expect(res.body).to.have.property("error").to.equal("User not found");
    });
  });
});
