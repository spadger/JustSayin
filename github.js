var config = require('./config');
var HipChatClient = require('node-hipchat');

function messageHipchat(request,response){
    var hipchat = new HipChatClient(config.hipchatApiKey);
    var sender = 'JustSayin::Github';

    console.log('REQUEST URL: ' + request.url);
    console.log('REQUEST BODY: ' + request.body);

    response.end(JSON.stringify(request.body));

//    var event = req.headers['x-github-event'];
//    var who = request.body.pusher.name;
//    var repo = request.body.repository.name;
//
//    //post an action to a bint* branch to shipping news room
//    config.branchesToRoomIds.forEach(function(branchRoom){
//
//    });
//
//    hipchat.postMessage(
//        {
//            room: hipchatConfig.roomId
//            ,from: hipchatConfig.postByName
//            ,notify: hipchatConfig.notify
//            ,color: hipchatConfig.postColor
//            ,message: 'test message'
//            ,message_format: 'html'
//        }
//        ,function(resp, err){
//            console.log(resp, err);
//            if (resp) {
//                if (resp.status === 'sent'){
//
//                }
//            }
//        });
    }

module.exports.messageHipchat = messageHipchat;