var config = require('./config');
var HipChatClient = require('node-hipchat');

function messageHipchat(req){
    var hipchat = new HipChatClient(config.hipchatApiKey);

    var roomId = 379365; //default of System Announcements room
    config.teams.forEach(function (team){
        if (req.body.issue.key.toLowerCase().substring(0,team.key.length) === team.key)
            roomId = team.roomId;
    })

    var htmlMessage = parseJiraPostBodyToHtmlMessage(req.body);

    hipchat.postMessage(
        {
            room: roomId,
            from: "JustSayin/JR",
            message: htmlMessage
        }
        , function (resp, err) {
            console.log(resp, err);
            if (resp) {
                if (resp.status === 'sent') {
                    console.log("Message sent from JIRA to Hipchat: " + htmlMessage)
                }
            }
        });
}

function parseJiraPostBodyToHtmlMessage(jira) {
    var message = '';
    if (jira.webhookEvent == 'jira:issue_updated') {
        var username = jira.user.displayName;
        if (jira.changelog != 'undefined') {
            jira.changelog.items.forEach(function (change) {
                if (change.field == 'status') {
                    message = createStatusUpdateMessage(username, change, jira.issue.key);

                }
            })
        }
    }

    return message;
}

function createStatusUpdateMessage(username,change, issueKey){
    var html =
        "<strong>" + username + "</strong> changed the <strong>status</strong> of " +
            "<a href=\"https://justgiving.atlassian.net/browse/" + issueKey + "\">" + issueKey + "</a> from " +
            "<strong>" + change.fromString + "</strong> to <strong>" + change.toString + "</strong>";

    return html;
}

module.exports.messageHipchat = messageHipchat;
module.exports.parseJiraPostBodyToHtmlMessage = parseJiraPostBodyToHtmlMessage;