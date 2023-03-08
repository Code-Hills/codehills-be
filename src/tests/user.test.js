/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { expect as _expect, use, request } from "chai";
import chaiHttp from "chai-http";
const expect = _expect; // remove

import app from "../app";
import { findOrCreateUser } from "../services/userService";

use(chaiHttp);

describe("Admin should assign roles", () => {
  it("should return a 401 Unauthorized status code", (done) => {
    //   const user = { role: "developer" };
    let invalidToken = "InvalidToken";
    request(app)
      .put("/api/v1/users/assign-role")
      .set("Authorization", `Bearer ${invalidToken}`)
      .send({ email: "test@example.com", role: "manager" })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal("Not Authorized!");
        done();
      });
  });

  describe("when the user is an admin", () => {
    let token;

    before(async () => {
      const user = await findOrCreateUser({
        // USE A SIMPLE MODEL DONT USE USER SERVICE
        email: "admin@example.com",
        password: "password",
        role: "admin",
      });
      token = generateToken(user.toJSON());
      it("should return a 404 Not Found status code", (done) => {
        request(app)
          .put("/api/v1/users/assign-role")
          .set("Authorization", `Bearer ${token}`)
          .send({ email: "nonexistent@example.com", role: "manager" })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.equal({
              message: "The user you are trying to update was not found!",
            });
            done();
          });
      });

      //   describe("when user is an admin", () => {
      //     let token;

      //     before(async () => {
      //       const user = await findOrCreateUser({
      //         // USE A SIMPLE MODEL DONT USE USER SERVICE
      //         email: "admin@example.com",
      //         password: "password",
      //         role: "admin",
      //       });
      //       token = generateToken(user.toJSON());
      //     });

      //     describe("when user does not exist", () => {

      //     });

      //     describe("when user is an admin", () => {
      //       before(async () => {
      //         await findOrCreateUser({
      //           email: "user@example.com",
      //           password: "password",
      //           role: "user",
      //         });
      //       });

      //       it("should return a 403 Forbidden status code", (done) => {
      //         request(app)
      //           .put("/api/v1/users/assign-roles")
      //           .set("Authorization", `Bearer ${token}`)
      //           .send({ email: "user@example.com", role: "admin" })
      //           .end((err, res) => {
      //             expect(res.status).to.equal(403);
      //             expect(res.body).to.eql({
      //               message: "Admin can not be assigned another role",
      //             });
      //             done();
      //           });
      //       });

      //       it("should update user role and return a 200 OK status code", (done) => {
      //         request(app)
      //           .put("/api/v1/users/assign-roles")
      //           .set("Authorization", `Bearer ${token}`)
      //           .send({ email: "user@example.com", role: "developer" })
      //           .end((err, res) => {
      //             expect(res.status).to.equal(200);
      //             expect(res.body).to.eql({
      //               message: "Assigned a role successfully!",
      //             });
      //             done();
      //           });
      //       });
      //     });
      //   });
    });
  });
});
