import { Pool } from "pg";
import Joi from "joi";

const pool = new Pool({
  user: "xpqpkfkytwtawv",
  host: "ec2-54-163-246-5.compute-1.amazonaws.com",
  database: "d85f5m5n2i0fo1",
  password: "aea9af9e850047d541527c27730364949631366f72ca4630763718066a13f498",
  port: 5432,
  ssl: true
});

const getAllQuestions = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      return res.send("error fetching client from pool", err);
    }
    client.query("SELECT * FROM questions", (err, result) => {
      if (err) return res.send(`error was found when running query ${err}`);
      res.send(result.rows);
    });
    done();
  });
};

const getSingleQuestion = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) return res.status(500).send(`error was found when connecting to the server ${err.message}`);
    client.query(
      "SELECT * FROM questions WHERE question_id = $1",
      [Number(req.params.id)],
      (err, result) => {
        if (err) return res.send(`error was found when running query on the database ${err.message}`);
        if (result.rows.length === 0)
          return res.send(`The given question does not exit in the database`);

        client.query(
          "SELECT * FROM answers WHERE question_id = $1",
          [Number(req.params.id)],
          (error, ansResult) => {
            if (error)
              return res.status(500).send(`error was found when connecting to the server ${err}`);
            if (ansResult.rows.length === 0)
              return res.send(`The given answer was not found in the database`);
            const trio = [...result.rows];
            const answers = [...ansResult.rows];
            trio[0].answers = answers;
            res.send(trio);
          }
        );
      }
    );
    done();
  });
};

const validatePostQuestion = question => {
  const queSchema = {
    question: Joi.string().required()
  };
  return Joi.validate(question, queSchema);
};

const postQuestion = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) return res.status(500).send(`error was found connecting to the server ${err.message}`);
    const { error, result } = validatePostQuestion();
    if (error) return res.status(404).send(`${error.message}`);
    client.query(
      "INSERT INTO questions (question,user_id,username) VALUES($1, $2, $3)",
      [req.body.question, req.body.user_id, req.body.username]
    );
    done();
    res.send("question was succesfully added");
  });
};

const deleteQuestion = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) return res.status(500).send(`error was found connecting to the server ${err.message}`);
    client.query(
      "SELECT question FROM questions WHERE question_id = $1 AND user_id = $2",
      [Number(req.params.id), req.body.user_id],
      (err, result) => {
        if (err)
          return res.status(500).send(`error was found when connecting to the database ${err.message}`);
        if (result.rows.length === 0) {
          return res.send(
            `You can't delete this question because its not in the dtabase!`
          );
        }
        client.query(
          "DELETE FROM questions WHERE question_id = $1",
          [Number(req.params.id)],
          (error, delResult) => {
            if (error)
              return res.send(
                `error was found connecting to the database ${err.message}`
              );

            res.send(
              `the question was deleted from the database ${delResult.rows}`
            );
          }
        );
      }
    );
    done();
  });
};

const validatePostAnswer = ans => {
  const ansSchema = {
    answer: Joi.string().required()
  };
  return Joi.validate(ans, ansSchema);
};

const postAnswer = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) return res.status(500).send(`error was found when connecting to the server ${err.message}`);
    const {error:errReport} = validatePostAnswer(req.body.response);
    if (errReport) return res.status(404).send(errReport.message);
    client.query(
      "SELECT question FROM questions WHERE question_id = $1",
      [Number(req.params.id)],
      (queErr, result) => {
        if (queErr)
          return res.send(`error was found connecting to the server ${err.message}`);
        if (result.rows.length === 0)
          return res.send(
            `The question with the ID can't be found in the database!...`
          );
        client.query(
          "INSERT INTO answers (question_id,user_id,response,vote,username,accepted) VALUES($1, $2, $3, $4, $5, $6)",
          [
            req.body.question_id,
            req.body.user_id,
            req.body.response,
            req.body.vote,
            req.body.username,
            false
          ],
          (error, queResult) => {
            if (error)
              return res.send(
                `error was found connecting to the database ${err.message}`
              );
          }
        );
      }
    );
    done();
    res.send("Answer was posted succesfully");
  });
};

const acceptAnswer = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) return res.status(500).send(`error was found when running the request ${err.message}`);
    client.query(
      "SELECT question FROM questions WHERE question_id = $questionId",
      [Number(req.params.qId)],
      (error, result) => {
        if (error)
          return res
            .status(500)
            .send(`Error connecting to the database! ... ${error}`);
        if (result.rows.length === 0)
          return res
            .status(404)
            .send(`The given question wasn't found in the database!`);

        client.query(
          "SELECT accepted FROM  answers WHERE answer_id = $answerId",
          [Number(req.params.aId)],
          (ansErr, ansResult) => {
            if (ansErr)
              return res.send(
                `error was found when connecting to the database ${ansErr.message}`
              );
            if (ansResult.rows.length === 0)
              return res
                .status(404)
                .send(`The given answer wasn't found in the database!`);

            client.query(
              "UPDATE answers SET accepted = $1 WHERE answer_id = $2 and user_id = $3",
              [req.body.accepted, Number(req.params.aId), req.body.user_id],
              (errUpdate, updateResult) => {
                if (errUpdate)
                  return res.send(
                    `error was found when connecting to the database ${errUpdate.message}`
                  );
                if (updateResult.rows.length === 0)
                  res
                    .status(404)
                    .send("You do not have permission to accept the answer");
                else {
                  res
                    .status(200)
                    .send("you have succesfully accepted the answer");
                }
              }
            );
          }
        );
      }
    );
    done();
  });
};

export {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  deleteQuestion,
  postAnswer,
  acceptAnswer
};
