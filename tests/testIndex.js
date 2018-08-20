import chai from "chai";
import chaiHttp from "chai-http";

import app from "../src/index";

const should = chai.should();

chai.use(chaiHttp);

describe("/Home Directory", () => {
  it("it send an ok status and be an array with 3 items", done => {
    chai
      .request(app)
      .get("/api/v1/questions")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(3);
        done();
      });
  });
});
