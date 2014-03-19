var config = require('./config');
var HipChatClient = require('node-hipchat');

function messageHipchat(req){
    var hipchat = new HipChatClient(config.hipchatApiKey);

    var message  = prepareHipChatMessage(req.body.build.buildStatusHtml);
	
    hipchat.postMessage(message ,function(resp, err){
            console.log(resp, err);
            if (resp) {
                if (resp.status === 'sent'){
                    console.log("Message sent from TeamCity to Hipchat:" + message)
                }
            }
        });
}

function prepareHipChatMessage(htmlMessage) {
	var message = {
            room: 144926,
            from: "JustSayin/TC",
            message: htmlMessage,
			color: htmlMessage.indexOf('failure') != -1 ? 'red' : 'yellow'
        };
		
	return message;
}

module.exports.messageHipchat = messageHipchat;
module.exports.prepareHipChatMessage = prepareHipChatMessage;