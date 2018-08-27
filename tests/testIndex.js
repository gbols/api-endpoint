import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

const should = chai.should();

chai.use(chaiHttp);

describe("Tests for the Get Questions Routes", () => {
  describe("/GET book", () => {
    it("it should GET all the questions", done => {
      chai
        .request(app)
        .get("/api/v1/questions")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/GET book", () => {
    it("it should GET  the first question", done => {
      chai
        .request(app)
        .get("/api/v1/questions/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});

describe("Tests for the Post Questions Routes", () => {
  it("it should not POST a question without question field", done => {
    const que = {
      question: ""
    };
    chai
      .request(app)
      .post("/api/v1/questions")
      .send(que)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("it should not POST a question without question field", done => {
    const que = {
      question: "Who is the bad guy? "
    };
    chai
      .request(app)
      .post("/api/v1/questions")
      .send(que)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});

describe("Test for the login and signup routes", () => {
  describe("/LOGIN", () => {
    it("it should not allow a user login without credentials", done => {
      const log = {
        username: "",
        password: "xuyidhi"
      };
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(log)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  describe("/LOGIN", () => {
    it("it should allow a user login with credentials", done => {
      const log = {
        username: "gbols",
        password: "gbolsgbols"
      };
      chai
        .request(app)
        .post("/api/v1/auth/login")
        .send(log)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("User succefully logged In!....");
          res.body.should.have.property("token");
          res.body.should.have.property("user");
          done();
        });
    });
  });
});

describe("Test for the login and signup routes", () => {
  describe("/SIGNUP", () => {
    it("it should not allow a user signup without credentials", done => {
      const sign = {
        username: "",
        email: "test@test.com",
        password: "xuyidhi"
      };
      chai
        .request(app)
        .post("/api/v1/auth/signup")
        .send(sign)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
});

describe("Testing for put, delete, post request when token isn't supplied!...", () => {
  it("it should not POST an answer without token", done => {
    chai
      .request(app)
      .post("/api/v1/questions/1/answers")
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it("it should not DELETE an answer without token", done => {
    chai
      .request(app)
      .delete("/api/v1/questions/1")
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });
});
