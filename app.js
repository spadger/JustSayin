var http = require('http');
var url = require('url');
var express = require('express');

var app = express();
var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';

var github = require('./github');

app.get('/', function (req,res){
    var service = req.query.service;

    if (service != 'undefined'){
        switch(service){
            case "github":
                github.messageHipchat(req);
        }
    }

    res.end('done')
})

app.listen(port);