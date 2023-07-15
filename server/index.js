import express from "express";
import Connection from "./database/db.js";
import routes from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

// const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); //running on two different servers.. so we r using cors...browser specific problem... will run on postman
app.use(express.urlencoded({ extended: true })); //no space between urls
app.use(express.json({ extended: true })); //response is in json form
app.use("/", routes);

const PORT = 8000;

Connection();

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});

//password for my cloud.mongodb : 329f1NjHMkw9GoZx
//username : aacrs7969
