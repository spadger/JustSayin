require('mocha');
require('should');

var github = require('./github');
var fs = require('fs');

describe('JustSayin',function(){

    describe('github',function(){

        it('should correctly parse a github post body into a hipchat html message',function(done){
            var sampleJSON = JSON.parse(fs.readFileSync('github_sample.json'));
            var sampleHTML = fs.readFileSync('githubtohipchat.html').toString();

            var result = github.parseGithubJsonIntoHipChatMessageHtml(sampleJSON.payload);
            result.should.eql(sampleHTML);

            done();
        })

    })


})