require('mocha');
require('should');

var github = require('./github');
var jira = require('./jira');
var fs = require('fs');

describe('JustSayin',function(){

    describe('github',function(){

        it('should parse a github post body into a hipchat html message',function(done){
            var sampleJSON = JSON.parse(fs.readFileSync('github_sample.json'));
            var sampleHTML = fs.readFileSync('githubtohipchat.html').toString();

            var result = github.parseGithubJsonIntoHipChatMessageHtml(sampleJSON.payload);
            result.should.eql(sampleHTML);

            done();
        })

    })

    describe('jira',function(){

        it('should parse a jira post body into a status update html message', function(done){
            var sampleJSON = JSON.parse(fs.readFileSync('jira_sample.json'));
            var sampleHTML = fs.readFileSync('jiratohipchat.html').toString();

            var result = jira.parseJiraPostBodyToHtmlMessage(sampleJSON);
            result.should.eql(sampleHTML);

            done();
        })
    })


})