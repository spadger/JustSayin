var config = require('./config');
var HipChatClient = require('node-hipchat');

function messageHipchat(request){
    var hipchat = new HipChatClient(config.hipchatApiKey);

//    console.log('REQUEST URL: ' + request.url);
//    console.log('REQUEST BODY: ' + JSON.stringify(request.body));
//    console.log('REQUEST HEADERS: ' + JSON.stringify(request.headers));

    var messageHtml = parseGithubJsonIntoHipChatMessageHtml(JSON.parse(request.body.payload));

    hipchat.postMessage(
        {
            room: 379365, // System Announcements room, just testing for now
            from: ":JustSayin/GH:",
            notify: false,
            color: 'yellow',
            message: messageHtml,
            message_format: 'html'
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