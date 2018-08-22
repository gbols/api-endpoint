import { Pool } from "pg";
import db from "../../model";

const pool = new Pool({
  user: "xpqpkfkytwtawv",
  host: "ec2-54-163-246-5.compute-1.amazonaws.com",
  database: "d85f5m5n2i0fo1",
  password: "aea9af9e850047d541527c27730364949631366f72ca4630763718066a13f498",
  port: 5432,
  ssl: true
});

const signUp = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      return res.send("error fetching client from pool", err);
    }
    client.query(
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3)",
      [req.body.username, req.body.email, req.body.password]
    );
    done();
    res.send("User created successfully");
  });
};

const signOut = (req, res) => {
  res.send("you have successfully signed out");
};

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
    if (err) return res.send(`error was found when running the request ${err}`);
    client.query(
      "SELECT * FROM questions WHERE question_id = $1",
      [Number(req.params.id)],
      (err, result) => {
        if (err) return res.send(`error was found when running query ${err}`);
        if (result.rows.length === 0)
          return res.send(`error was found when running query ${err}`);

        client.query(
          "SELECT * FROM answers WHERE question_id = $1",
          [Number(req.params.id)],
          (error, ansResult) => {
            if (error)
              return res.send(`error was found when running query ${err}`);
            if (ansResult.rows.length === 0)
              return res.send(`error was found when running query ${err}`);
            res.send([
              "Question:",
              ...result.rows,
              "Answers:",
              ...ansResult.rows
            ]);
          }
        );
      }
    );
    done();
  });
};

const postQuestion = (req, res) => {
  pool.connect((err, client, done) => {
    if (err) return res.send(`error was found when running the request ${err}`);
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
    if (err) return res.send(`error was found when running the request ${err}`);
    client.query(
      "SELECT question FROM questions WHERE question_id = $1 AND user_id = $2",
      [Number(req.params.id), req.body.user_id],
      (err, result) => {
        if (err)
          return res.send(`error was found when running the request ${err}`);
        if (result.rows.length === 0) {
          return res.send(`You can't delete this question because its not in the dtabase!`);
        } 
          client.query(
            "DELETE FROM questions WHERE question_id = $1",
            [Number(req.params.id)],
            (error, delResult) => {
              if (error)
                return res.send(
                  `error was found when running the request ${err}`
                );
                
                 res.send(`the question was deleted from the database ${delResult.rows}`)
            }
          );
      }
    );
    done();
  });
};

export {
  signUp,
  signOut,
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
  deleteQuestion
};
