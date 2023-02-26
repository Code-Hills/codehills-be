import app from "../app";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

chai.use(chaiHttp);

describe("API test", () => {
  describe("/GET Welcome", () => {
    it("it should GET welcome message", (done) => {
      chai
        .request(app)
        .get("/api/v1/")
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.have.property("message");
          expect(res.body.message).to.equal("Welcome to codehills backend!");
          done();
        });
    });
  });

  describe("/all unspecified routes", () => {
    it("it should handle all unspecified routes", (done) => {
      chai
        .request(app)
        .get("/ghyy")
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
});
