const express = require("express");
const routUser = require("./Router/User.js");
const routTodo = require("./Router/todo.js");
require("./db/mongoose");


const app = express();
const port = process.env.Port || 3000;



app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use("/User", routUser);
app.use("/Todo", routTodo);



app.listen(port, () => {
  console.log("Server is up on port" + port);
});