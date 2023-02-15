import chai from "chai";
import chaiHttp from "chai-http";
import { welcomeController } from "../controllers/index.js";

chai.use(chaiHttp);
chai.should();

describe("Welcome Controller", () => {
  describe("GET /welcome", () => {
    it("should return a welcome message", (done) => {
      const req = {};
      const res = {
        json: (response) => {
          response.should.have
            .property("message")
            .equal("Welcome to codehills backend!");
          done();
        },
      };
      welcomeController(req, res);
    });
  });
});
