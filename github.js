var config = require('./config');
var HipChatClient = require('node-hipchat');

function messageHipchat(request){
    var hipchat = new HipChatClient(config.hipchatApiKey);

    var payload = JSON.parse(request.body.payload);
    var branchName = payload.ref.replace('refs/heads/','');
    var repoName = payload.repository.name;
    var roomId = 379365; //default of System Announcements room
    config.teams.forEach(function (team){
        if (branchName.toLowerCase().substring(0,team.key.length) === team.key)
            if (team.key == 'master')
            {
                if (team.repo == repoName){
                    roomId = team.roomId;
                }
            }
            else
            {
                roomId = team.roomId;
            }
    })

    var messageHtml = parseGithubJsonIntoHipChatMessageHtml(payload);

    hipchat.postMessage(
        {
            room: roomId,
            from: "JustSayin/GH",
            message: messageHtml
        }
        ,function(resp, err){
            console.log(resp, err);
            if (resp) {
                if (resp.status === 'sent'){
                    console.log("Message sent from Github to Hipchat:" + messageHtml)
                }
            }
        });
    }

function parseGithubJsonIntoHipChatMessageHtml(payload){
    var github = "https://github.com/";
    var pusherUsername = payload.pusher.name;
    var branch = payload.ref.replace('refs/heads/','');
    var repoUrl = payload.repository.url;
    var repo = payload.repository.name;
    var html =
        "<a href=\"" + github + pusherUsername + "\">" + pusherUsername + "</a> pushed to " +
        "<a href=\"" + repoUrl + "/tree/" + branch + "\">" + branch + "</a> branch of repo " +
        "<a href=\"" + repoUrl + "\">" + repo + "</a><br>";

    payload.commits.forEach(function(commit){
        html = html + "- " + commit.message + " (<a href=\"" + commit.url + "\">" + commit.id.slice(0,7) + "</a>)<br>";
    });

    return html;
}

module.exports.messageHipchat = messageHipchat;
module.exports.parseGithubJsonIntoHipChatMessageHtml = parseGithubJsonIntoHipChatMessageHtml;