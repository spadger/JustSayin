var http = require('http');
var url = require('url');
var express = require('express');

var app = express();
app.use(express.bodyParser());
var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';

var github = require('./github');

app.post('/', function (req,res){
    var service = req.query.service;

    if (service != 'undefined'){
        switch(service){
            case "github":
                github.messageHipchat(req,res);
        }
    }

    res.end('done')
});

app.get('/',function(req,res){
    res.end('done get');
});

app.listen(port);