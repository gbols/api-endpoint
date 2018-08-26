import express from "express";
import bodyParser from "body-parser";
import Router from "./api/routes/router";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => res.json({ message: "Welcome to our StackOverflow Lite! ..." }));
app.use("/api/v1", Router);
app.use("/api/v1/auth", Router);

const port = process.env.PORT || 3000;
app.listen(port);
console.log("listening on port 3000 ......");

export default app;
