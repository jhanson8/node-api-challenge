/* jshint esversion: 6 */
const express = require("express");

const server = express();
server.use(express.json());

const projectRouter = require("./api/projectRouter");
const actionRouter = require("./api/actionRouter");

// Logger MiddleWare execution
server.use(logger);

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

// server.get("/", (req, res) => {
//   res.send(`<h2>Node API Challenge!</h2>`);
// });

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

module.exports = server;
