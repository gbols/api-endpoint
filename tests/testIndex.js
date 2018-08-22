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

describe("test for a specific route", () => {
  it("it send an ok status an object", done => {
    chai
      .request(app)
      .get("/api/v1/questions/2")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        done();
      });
  });
});

describe("/Test with Invalid id", () => {
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
  it("should not post without the question field ", done => {
    const que = {
      answers: []
    };

    chai
      .request(app)
      .post("/api/v1/questions")
      .send(que)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/POST request", () => {
  it("should post a question when all fields are met ", done => {
    const que = {
      id: 5,
      question: "who is black panther?",
      answers: []
    };

    chai
      .request(app)
      .post("/api/v1/questions")
      .send(que)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.book.should.have.property("id");
        res.body.book.should.have.property("question");
        res.body.book.should.have.property("answers");
        done();
      });
  });
});
