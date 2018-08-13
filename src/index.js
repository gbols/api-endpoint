import express from "express";
import data from "./model";
import { validateId } from "./helper";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("use the following URI /api/v1/questions");
});

app.get("/api/v1/questions", (req, res) => {
  res.send(data);
});

app.get("/api/v1/questions/:id", (req, res) => {
  const que = validateId(parseInt(req.params.id));
  if (!que)
    return res.status(404).send("The question with the given ID was not found");
  res.send(que);
});

app.post("/api/v1/questions", (req, res) => {
  const question = {
    id: data.length + 1,
    question: req.body.question,
    answers: []
  };
  data.push(question);
  res.send(question);
});

app.listen(3000);
console.log("listening on port 3000 ......");

export default app;
