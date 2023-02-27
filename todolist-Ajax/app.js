var express = require('express');
// require('dotenv').config();
var todoController = require("./controllers/todoController");
var app = express();

app.set('view engine','ejs');
app.use(express.static('./public'));
todoController(app);

app.listen(3000);
console.log("Listening on 3000");