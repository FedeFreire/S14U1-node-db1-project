const express = require("express");
const morgan = require("morgan");
const accountsRouter = require("./accounts/accounts-router.js");

const server = express();

server.use(express.json());
server.use(express.json());
server.use(morgan("tiny"));

server.use("/api/accounts", accountsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
