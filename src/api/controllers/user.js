import { Pool } from "pg";
import Jwt from "jsonwebtoken";

const connectionString =
  "postgres://pdyqtaaezaoqrn:efae001f55f6323aa1eb5a1ae1a7c8f13d96cf25f5a0d5e44a6c5ccd1902cb4b@ec2-54-235-94-36.compute-1.amazonaws.com:5432/dcima2je7js83h?ssl=true";

const pool = new Pool({
  connectionString: connectionString
});

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const signUp = (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.status(403).send("missing fields are required");
  } if (
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
      "SELECT * FROM users  WHERE username = $1",
      [req.body.username],
      (userErr, userResult) => {
        if (userErr) return res.sendStatus(500);
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
          "SELECT * FROM users WHERE username = $1 AND email = $2 AND password = $3",
          [req.body.username, req.body.email, req.body.password],
          (userDetailsErr, userDetailsResult) => {
            if (userDetailsErr) {
              res.send(
                `Error fetching user from the database...! ${
                  userDetailsErr.message
                }`
              );
            } else {
              const user = userDetailsResult.rows[0];
              // res.json({message: `user succesfully created!.....`});
              Jwt.sign({ user }, "luapnahalobgujnugalo", (err, token) => {
                res.json({ token, user, message: `User succefully created!....` });
              });
            }
          }
        );
      }
    );
    done();
  });
};

const logIn = (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(403).send("missing fields are required");
  }  
  if (!req.body.username.trim() || !req.body.password.trim()) {
    return res.status(403).send("all input fields are required");
  }
  pool.connect((err, client, done) => {
    if (err)
      return res
        .status(500)
        .send(`error connecting to the sever ${err.message}`);
    client.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [req.body.username, req.body.password],
      (loginErr, loginResult) => {
        if (loginErr)
          return res
            .status(500)
            .send(
              `There was an error connecting to the database ${
                loginErr.message
              }`
            );
        else if (loginResult.rows.length === 0)
          { res
            .status(403)
            .send(`user does not have an account you need to sign up!....`);}
            else{
              const user = loginResult.rows[0];
              Jwt.sign({ user }, "luapnahalobgujnugalo", (err, token) => {
                if(err) return res.status(500).send("Error generating your token");
                res.json({ token, user, message: `User succefully logged In!....` });
              });
            }
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

export { signOut, signUp, logIn, verifyToken };
