import { Pool } from "pg";
import Jwt from "jsonwebtoken";

const connectionString =
  "postgres://pdyqtaaezaoqrn:efae001f55f6323aa1eb5a1ae1a7c8f13d96cf25f5a0d5e44a6c5ccd1902cb4b@ec2-54-235-94-36.compute-1.amazonaws.com:5432/dcima2je7js83h?ssl=true";

const pool = new Pool({
  connectionString
});

const getAllQuestions = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      return res
        .status(500)
        .send("error fetching client from pool", err.message);
    }
    client.query("SELECT * FROM questions", (err, result) => {
      if (err) {
        if (statusCode >= 100 && statusCode < 600) res.status(statusCode);
        else {
          res.status(500);
        }
      } else {
        res.send(result.rows);
      }
    });
    done();
  });
};

const getSingleQuestion = (req, res) => {
  pool.connect((err, client, done) => {
    if (err)
      return res
        .status(500)
        .send(`error was found when connecting to the server ${err.message}`);
    client.query(
      "SELECT * FROM questions WHERE questionid = $1",
      [Number(req.params.id)],
      (err, result) => {
        if (err)
          return res.send(
            `error was found when running query on the database ${err.message}`
          );
        if (result.rows.length === 0)
          return res.send(`The given question does not exit in the database`);

        client.query(
          "SELECT * FROM answers WHERE questionid = $1",
          [Number(req.params.id)],
          (error, ansResult) => {
            if (error)
              return res
                .status(500)
                .send(`error was found when connecting to the server ${err}`);
            if (ansResult.rows.length === 0) {
              const trio = [...result.rows];
              const answers = [];
              trio[0].answers = answers;
              res.send(trio);
            } else {
              const trio = [...result.rows];
              const answers = [...ansResult.rows];
              trio[0].answers = answers;
              res.send(trio);
            }
          }
        );
      }
    );
    done();
  });
};

const postQuestion = (req, res) => {
  if (!req.body.question) {
    return res.status(403).send(`Missing Input is required!.....`);
  }
  if (!req.body.question.trim()) {
    return res.status(403).send(`Empty Input is required!.....`);
  }
  Jwt.verify(req.token, "luapnahalobgujnugalo", (tokenErr, authData) => {
    if (tokenErr)
      return res
        .status(403)
        .send(`error verifying your token ${tokenErr.message}`);
    pool.connect((err, client, done) => {
      if (err)
        return res
          .status(500)
          .send(`error was found connecting to the server ${err.message}`);
      client.query(
        "INSERT INTO questions (question,userid,username) VALUES($1, $2, $3)",
        [req.body.question, authData.user.userid, authData.user.username],
        (postErr, postResult) => {
          if (postErr) {
            console.log(authData);
            res
              .status(403)
              .send(
                `error was found runnning the query....! ${postErr.message}`
              );
          } else {
            res.status(200).json({ message: "Question was successfully posted! ....." });
          }
        }
      );
      done();
    });
  });
};

const deleteQuestion = (req, res) => {
  Jwt.verify(req.token, "luapnahalobgujnugalo", (tokenErr, authData) => {
    if (tokenErr)
      return res
        .status(403)
        .send(`error verifying your token ${tokenErr.message}`);
    pool.connect((err, client, done) => {
      if (err)
        return res
          .status(500)
          .send(`error was found connecting to the server ${err.message}`);
      client.query(
        "SELECT * FROM questions WHERE questionid = $1 AND userid = $2",
        [Number(req.params.id), authData.user.userid],
        (error, delResult) => {
          if (error) {
            res.send(
              `error was found connecting to the database ${error.message}`
            );
          } else if (delResult.rows.length === 0) {
            res.send(
              `You do not have permission to delete the question or the question is not in the database`
            );
          } else {
            client.query(
              " DELETE FROM questions WHERE questionid = $1",
              [Number(req.params.id)],
              (deletErr, deleteResult) => {
                if (deletErr) {
                  res
                    .status(500)
                    .send(
                      `Error was found when querying the server ${
                        deletErr.message
                      }`
                    );
                } else {
                  res
                    .status(200)
                    .send(`Question was succesfully deleted!.....`);
                }
              }
            );
          }
        }
      );
      done();
    });
  });
};

const postAnswer = (req, res) => {
  if (!req.body.response) {
    return res.status(403).send(`Missing Input is required!.....`);
  }
  if (!req.body.response.trim()) {
    return res.status(403).send(`Empty Input is required!.....`);
  }
  Jwt.verify(req.token, "luapnahalobgujnugalo", (tokenErr, authData) => {
    if (tokenErr)
      return res
        .status(403)
        .send(`error verifying your token ${tokenErr.message}`);
    pool.connect((err, client, done) => {
      if (err)
        return res
          .status(500)
          .send(`error was found when connecting to the server ${err.message}`);

      client.query(
        "SELECT question FROM questions WHERE questionid = $1",
        [Number(req.params.id)],
        (queErr, result) => {
          if (queErr)
            return res.send(
              `error was found connecting to the server ${err.message}`
            );
          if (result.rows.length === 0)
            return res.send(
              `The question with the ID can't be found in the database!...`
            );
          client.query(
            "INSERT INTO answers (questionid,userid,response,vote,username,accepted) VALUES($1, $2, $3, $4, $5, $6)",
            [
              req.params.id,
              authData.user.userid,
              req.body.response,
              0,
              authData.user.username,
              false
            ],
            (error, queResult) => {
              if (error) {
                res
                  .status(500)
                  .send(
                    `error was found connecting to the database ${
                      error.message
                    }`
                  );
              } else {
                res.send("Answer was posted succesfully");
              }
            }
          );
        }
      );
      done();
    });
  });
};

const acceptAnswer = (req, res) => {
  if (!req.body.accepted) {
    return res.status(403).send(`Missing Input is required!.....`);
  }
  if (!req.body.accepted.trim()) {
    return res.status(403).send(`Empty Input is required!.....`);
  }
  Jwt.verify(req.token, "luapnahalobgujnugalo", (tokenErr, authData) => {
    if (tokenErr)
      return res.send(`error verifying your token ${tokenErr.message}`);
    pool.connect((err, client, done) => {
      if (err)
        return res.send(
          `error was found when running the request ${err.message}`
        );
      client.query(
        "SELECT question FROM questions WHERE questionid = $1",
        [Number(req.params.qId)],
        (error, result) => {
          if (error)
            return res
              .status(500)
              .send(`Error connecting to the database! ... ${error.message}`);
          if (result.rows.length === 0) {
            res.send(`The given question wasn't found in the database!`);
          }
          client.query(
            "SELECT * FROM  answers WHERE answerid = $1",
            [Number(req.params.aId)],
            (ansErr, ansResult) => {
              if (ansErr)
                return res.send(
                  `error was found when connecting to the database ${
                    ansErr.message
                  }`
                );
              if (ansResult.rows.length === 0) {
                res.send(`The given answer wasn't found in the database!`);
              } else {
                client.query(
                  "UPDATE answers SET accepted = $1 WHERE userid = $2",
                  [req.body.accepted, authData.user.userid],
                  (errUpdate, updateResult) => {
                    if (errUpdate) {
                      res
                        .status(500)
                        .send(
                          `error was found when connecting to the database ${
                            errUpdate.message
                          }`
                        );
                    } else {
                      res.send("you have succesfully accepted the answer");
                    }
                  }
                );
              }
            }
          );
        }
      );
      done();
    });
  });
};

const notAvailable = (req ,res) => {
  res.status(404).send(`This page is not available on this application `);
}
export {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  deleteQuestion,
  postAnswer,
  acceptAnswer,
  notAvailable
};
