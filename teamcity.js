var config = require('./config');
var HipChatClient = require('node-hipchat');

function messageHipchat(req){
    var hipchat = new HipChatClient(config.hipchatApiKey);
    var message = req.body.build.buildStatusHtml;

    hipchat.postMessage(
        {
            room: 379365, // System Announcements room, just testing for now
            from: "JustSayin/TC",
            message: message
        }
        ,function(resp, err){
            console.log(resp, err);
            if (resp) {
                if (resp.status === 'sent'){
                    console.log("Message sent from TeamCity to Hipchat:" + message)
                }
            }
        });
}

module.exports.messageHipchat = messageHipchat;