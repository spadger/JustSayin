var http = require('http');
var url = require('url');
var express = require('express');
var github = require('./github');
var teamcity = require('./teamcity');
var jira = require('./jira');

var port = process.env.PORT || 3000;
var host = process.env.HOST || 'localhost';

var app = express();
app.use(express.bodyParser());

app.post('/', function (req,res){
    var service = req.query.service;

    if (service != 'undefined'){
        switch(service.toLowerCase()){
            case 'github':
                github.messageHipchat(req);
            case 'teamcity':
                teamcity.messageHipchat(req);
            case 'jira':
                jira.messageHipchat(req);
        }
    }
    else{
        console.log('service queryparam not defined.')
    }

});

app.get('/',function(req,res){
    res.end('JustSayin is a messaging bot used by JustGiving.com to route messages between systems and internal chat. It cannot be used from a browser.')
});

app.listen(port);