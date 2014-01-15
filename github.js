var config = require('./config');
var HipChatClient = require('node-hipchat');
var escape = require('escape-html');

function messageHipchat(request,response){
    var hipchat = new HipChatClient(config.hipchatApiKey);

    console.log('REQUEST URL: ' + request.url);
    console.log('REQUEST BODY: ' + JSON.stringify(request.body));

    var messageHtml = parseGithubJsonIntoHipChatMessageHtml(JSON.stringify(request.body));
    var escapedMessageHtml = escape(messageHtml);

    hipchat.postMessage(
        {
            room: 379365, // System Announcements room, just testing for now
            from: "JustSayin::GitHub",
            notify: false,
            color: 'yellow',
            message: escapedMessageHtml,
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

function parseGithubJsonIntoHipChatMessageHtml(body){
    var github = "https://github.com/";
    var pusherUsername = body.payload.pusher.name;
    var branch = body.payload.ref.toString().replace('refs/heads/','');
    var repoUrl = body.payload.repository.url;
    var repo = body.payload.repository.name;
    var html = [];
    html.push(
        "<a href=\"" + github + pusherUsername + "\">" + pusherUsername + "</a> pushed to ",
        "<a href=\"" + repoUrl + "/tree/" + branch + "\">" + branch + "</a> branch of repo ",
        "<a href=\"" + repoUrl + "\">" + repo + "</a>"
    )
    html.push("<ul>")
    body.payload.commits.forEach(function(item){
        html.push(
            "<li>- " + item.message + "</li>"
        );
    });
    html.push("</ul>");

    return html.join("");
}

module.exports.messageHipchat = messageHipchat;
module.exports.parseGithubJsonIntoHipChatMessageHtml = parseGithubJsonIntoHipChatMessageHtml;