import express from "express";
import path from "path";
import docs from "./api/controllers/docs"
import bodyParser from "body-parser";
import Router from "./api/routes/router";

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) =>
  res.send({ message: "Welcome to our StackOverflow Lite! ..." })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/getjson', docs);

app.use("/api/v1", Router);
app.use("/api", Router);
app.use("/api/v1/auth", Router);

const port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port 3000 ......");

export default app;
