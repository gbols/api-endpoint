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

export default signUp;
