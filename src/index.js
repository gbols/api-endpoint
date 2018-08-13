import express from "express";
import data from "./model";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("use the following URI /api/v1/questions");
});

app.get("/api/v1/questions", (req, res) => {
  res.send(data);
});

app.listen(3000);
console.log("listening on port 3000 ......");

export default app;
