const { log } = require("console");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const successHandle = require("./successHandle");
const errHandle = require("./errorHandle");
const getTodo = require("./getTodo");
const postTodo = require("./postTodo");
const deleteTodo = require("./deleteTodo");
const todos = [];

const requestListener = (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url == "/todos" && req.method == "GET") {
    // getTodo.js
    getTodo(res, todos);
  } else if (req.url == "/todos" && req.method == "POST") {
    // postTodo.js
    postTodo(req, res, todos);
  } else if (req.url == "/todos" && req.method == "DELETE") {
    // deleteTodo.js
    deleteTodo(res,todos);
  } else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
    // deleteTodo.js
  } else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
    // patchTodo.js
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "false",
        message: "無此網站路由",
      })
    );
    res.end();
  }
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3005);
