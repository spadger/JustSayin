var config = require('./config');
var HipChatClient = require('node-hipchat');

function messageHipchat(req){
    var hipchat = new HipChatClient(config.hipchatApiKey);

    hipchat.postMessage(
        {
            room: 379365, // System Announcements room, just testing for now
            from: "JustSayin/TC",
            message: req.buildStatusHtml
        }
        ,function(resp, err){
            console.log(resp, err);
            if (resp) {
                if (resp.status === 'sent'){
                    console.log("Message sent from TeamCity to Hipchat:" + messageHtml)
                }
            }
        });
}

module.exports.messageHipchat = messageHipchat;