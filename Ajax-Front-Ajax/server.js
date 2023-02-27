//后端代码
var functionFile = require("./functionFile"); //调用外部js文件（测试）
var express = require("express"); //该模块的作用是用于发布 post、get等相关http接口
const bodyParser = require("body-parser"); //该模块的作用是对 http请求体 进行解析
var app = express();
//配置跨域相关
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
//监听8888端口
app.listen(8888, () => {
  console.log("Nodejs Server is opend on 8888\n\n");
});
//http请求体 解析格式设置（可多样）
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false,}));
//ServerFunc post接口
app.post("/ServerFunc", (req, res) => {
  console.log("'ServerFunc' receipt of a request：");
  console.log(req.body);
  console.log(req.body.name);
  console.log("\n");
  var retValue = "Hello" + " " + req.body.name + " " + "this is ServerFunc";
  res.json({
    name: retValue,
  });
});

//FunctionFileFunc post接口
app.post("/FunctionFileFunc", (req, res) => {
  console.log("'FunctionFileFunc' receipt of a request：");
  console.log(req.body);
  console.log(req.body.name);
  console.log("\n");
  var functionFileRet = functionFile.SayHello(req.body.name); //调用外部js文件方法函数
  res.json({
    name: functionFileRet,
  });
});