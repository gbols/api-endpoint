import chai from "chai";
import chaiHttp from "chai-http";

import app from "../src/index";

const should = chai.should();

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

  it("it should return a object", done => {
    chai
      .request(app)
      .get("/api/v1/questions/2")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should be an error", done => {
    chai
      .request(app)
      .get("/api/v1/questions/4")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe("/POST request", () => {
  it("should put a question in the database", done => {
    const que = {
      question: "The Lord of the Rings",
      answers: []
    };

    chai
      .request(app)
      .post("/api/v1/questions")
      .send(que)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
