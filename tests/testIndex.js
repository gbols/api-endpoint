import chai from "chai";
import chaiHttp from "chai-http";

import app from "../src/index";
const  should = chai.should();


chai.use(chaiHttp);

describe("/Home Directory", () => {
  it("it send an ok status", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});