/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { expect, use, request } from "chai";
import chaiHttp from "chai-http";
import app from "../app";

use(chaiHttp);

describe("Assign roles tests", () => {
  const loginRoute = "/api/v1/auth/login";
  const AssignRolesRoute = "/api/v1/users/roles";
  it("should return a 401 Unauthorized if user is not an admin", async () => {
    // login a user
    const user = { email: "jdoe@example.com" }; // this user must be in the seeds & not an admin
    const loginRes = await request(app).post(loginRoute).send(user);
    const token = loginRes.body.token;

    request(app)
      .put(AssignRolesRoute)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "janedoe@example", role: "manager" }) // user must be in seeds
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property(
          "message",
          "Not Authorized! Only admin can assign roles"
        );
      });
  });

  it("should return a 404 If the user is not found", async () => {
    // login an admin
    const user = { email: "codehill@admin.com" }; // this user must be an admin & in the seeds
    const loginRes = await request(app).post(loginRoute).send(user);
    const token = loginRes.body.token;
    request(app)
      .put(AssignRolesRoute)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "nonexistent@example.com", role: "manager" })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property(
          "message",
          "The user you are trying to update was not found!"
        );
      });
  });

  it("should return a 403 Forbidden trying to update an admin role", async () => {
    // login an admin
    const user = { email: "codehill@admin.com" }; // this user must be an admin & in the seeds
    const loginRes = await request(app).post(loginRoute).send(user);
    const token = loginRes.body.token;
    request(app)
      .put(AssignRolesRoute)
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "codehill@admin.com", role: "manager" })
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.have.property(
          "message",
          "Admin can not be assigned another role"
        );
      });

    it("should update user role and return a 200 OK status code", async () => {
      const user = { email: "codehill@admin.com" }; // this user must be an admin & in the seeds
      const loginRes = await request(app).post(loginRoute).send(user);
      const token = loginRes.body.token;
      request(app)
        .put(AssignRolesRoute)
        .set("Authorization", `Bearer ${token}`)
        .send({ email: "janedoe@example", role: "manager" })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property(
            "message",
            "Assigned a role successfully!"
          );
        });
    });
  });
});
