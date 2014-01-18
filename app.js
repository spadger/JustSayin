var http = require('http');
var url = require('url');
var express = require('express');
var github = require('./github');

var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';

var app = express();
app.use(express.bodyParser());

app.post('/', function (req,res){
    var service = req.query.service;

    if (service != 'undefined'){
        switch(service){
            case 'github':
                github.messageHipchat(req);
            case 'teamcity':

            case 'jira':
        }
    }
    else{
        console.log('service queryparam not defined.')
    }

    res.end('JustSayin is a messaging bot used by JustGiving.com to route messages between systems and internal chat. It cannot be used from a browser.')
});

app.get('/',function(req,res){
    res.end('done get');
});

app.listen(port);