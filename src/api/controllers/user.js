import { Pool } from "pg";
import Jwt from "jsonwebtoken";

const pool = new Pool({
  user: "xpqpkfkytwtawv",
  host: "ec2-54-163-246-5.compute-1.amazonaws.com",
  database: "d85f5m5n2i0fo1",
  password: "aea9af9e850047d541527c27730364949631366f72ca4630763718066a13f498",
  port: 5432,
  ssl: true
});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const signUp = (req, res) => {
  let user;
  if (
    !req.body.username.trim() ||
    !req.body.password.trim() ||
    !req.body.email.trim()
  ) {
    return res.status(403).send("all inputs field are required");
  }
  const validEmail = validateEmail(req.body.email);
  if (!validEmail) res.send("Please Input a valid email address");

  pool.connect((err, client, done) => {
    if (err) {
      return res.send("error fetching client from pool", err);
    }
    client.query(
      "SELECT FROM users  WHERE username = $1",
      [req.body.username],
      (userErr, userResult) => {
        if (userErr)
          return res.sendStatus(500);
            // .send(`Error connecting to database ${userErr.message}`);
        if (userResult.rows.length !== 0)
          return res.send(
            `User with credentials already exits in the database`
          );
        client.query(
          "INSERT INTO users(username, email, password) VALUES($1, $2, $3)",
          [req.body.username, req.body.email, req.body.password]
        );
        client.query(
          "SELECT user FROM users WHERE username = $1 AND email = $2 AND password = $3",
          [req.body.username, req.body.email, req.body.password],
          (userDetailsErr, userDetailsResult) => {
            if (userDetailsErr) {
              res.send(
                `Error fetching user from the database...! ${
                  userDetailsErr.message
                }`
              );
            } else {
              user = userDetailsResult.rows[0];
              // res.json({message: `user succesfully created!.....`});
              Jwt.sign({ user }, "luapnahalobgujnugalo", (err, token) => {
                res.json({ token, message:`User succefully created!....` });
              });
            }
          }
        );
      }
    );
    done();
  });
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) return res.status(403).send("Forbidden! ....");
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;
  next();
};

const signOut = (req, res) => {
  res.send("you have successfully signed out");
};

export { signOut, signUp, verifyToken };
