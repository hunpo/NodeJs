var bodyParser=require("body-parser");
var urlencodeParse = bodyParser.urlencoded({extends:false})

var data =[{item:"walk date"},{item:"run dog"},{item:"fly airplane"}]
module.exports = function(app){
app.get('/todo',function(req,res){
    console.log("ok");
    res.render('todo',{todos:data});
    });

app.post('/todo',urlencodeParse,function(req,res){
    data.push(req.body);
    res.json(data)
});

app.delete('/todo/:item',function(req,res){
    data=data.filter(function(todo){
        return todo.item.trim().replace(/ /g, "-") != req.params.item;
    });
    res.json(data)
});

}