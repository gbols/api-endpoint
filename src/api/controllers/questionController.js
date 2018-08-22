import db from "../../model";

const getAllQuestions = (req, res) => {
res.json(db);
}

const getSingleQuestion = (req, res) => {
  const questionId = parseInt(req.params.id);
  const result = findId(questionId);
  if(!result) 
    return res.status(404).send("The Qestion with the given Id was not found in the database");
  const selectedQuestion = db.filter(question => question.id === questionId);
  res.json(selectedQuestion);

}

function findId (questionId){
  return db.find(question => question.id === questionId);
}

export { getAllQuestions, getSingleQuestion}