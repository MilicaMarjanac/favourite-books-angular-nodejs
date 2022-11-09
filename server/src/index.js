import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "../database.js";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

import usersRoute from "./routes/users.js";
app.use("/users", usersRoute);

import booksRoute from "./routes/books.js";
app.use("/books", booksRoute);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
