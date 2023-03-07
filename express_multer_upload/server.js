var express = require('express')
var fs = require('fs')
var multer = require('multer');

var app = express()
var createFolder = function(folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './upload/';
createFolder(uploadFolder);

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

app.get('/form', function(req, res) {
    var form = fs.readFileSync('./form.html', { encoding: "utf8" });
    res.send(form);
});
    
app.post('/upload', upload.single('logo'), function(req, res) {
    console.dir(req.file);
    res.send({ 'ret_code': 0 });
});

app.listen(3001);
console.log('listening to port 3001');


