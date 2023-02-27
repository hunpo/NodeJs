const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const uri =
  "mongodb+srv://george:pass123@cluster0.swhqnth.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected");
});
var todoSchema = new mongoose.Schema({
  item: String,
});
var Todo = new mongoose.model("todo", todoSchema);

// var itemone = Todo({item:'buy flowers'}).save(function(err){
//     if (err)throw err;
//     console.log('item saved')
// });

var bodyParser = require("body-parser");
var urlencodeParse = bodyParser.urlencoded({ extends: false });

var data = [
  { item: "walk date" },
  { item: "run dog" },
  { item: "fly airplane" },
];
module.exports = function (app) {
  app.get("/todo", function (req, res) {
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodeParse, function (req, res) {
    var itemone = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", function (req, res) {
    // data=data.filter(function(todo){
    //     return todo.item.trim().replace(/ /g, "-") != req.params.item;
    // });
    Todo.find({item: req.params.item.replace(/-/g, " ")}).deleteOne(function(err, data){
        if (err) throw err;
        res.json(data);
      }
    );
    });
};
