'use strict';

const APNlib  = require('apn'),
      FCMlib  = require('fcm-node'),
      PATH    = require('path'),
      env     = require(PATH.resolve(`./config/env/${process.env.NODE_ENV}`));

class PUSH {

  /*setting GLOBAL paramters for this PUSH Notification class*/
    constructor(){
      /*setting up APPLE Push Notification(APN) Options*/
      let _apn_opt = {
          token : {
            key: env.APPLE.key,
            keyId: env.APPLE.keyId,
            teamId: env.APPLE.teamId,
          },
          production : env.APPLE.production
      };

      this._apn_opt = _apn_opt;

      /*setting up Google Firebase Cloud Messaging(FCM) Options*/
      let _fcm_server_key = env.GOOGLE.key;

      this._fcm_server_key = _fcm_server_key;
    }

    APN(deviceToken, message, badge, type=0){       
      let apnProvider = new APNlib.Provider(this._apn_opt),
          _push       = new APNlib.Notification();

      _push.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now. 
      _push.sound = env.APPLE.sound;
      _push.topic = env.APPLE.topic;

      let _send_push = function(deviceToken, message, badge){
        _push.alert = message;
        _push.payload = {"type" : type};
        _push.badge = badge;

        if(deviceToken) apnProvider.send(_push, deviceToken).then(result=>console.log(result));

      }

      _send_push(deviceToken, message, badge);

    }

    FCM(deviceToken, message, badge, type=0){
    let fcm = new FCMlib(this._fcm_server_key);
      /*Send notification to Android Device*/
        fcm.send({
            to: deviceToken,
            data : {
              title: message, //'Title of your push notification', 
              body: message,
              type: type
            }
        }, (err, response) => {
            if(err) console.log("Something has gone wrong while sending FCM Push!");
            if(response) console.log("Successfully sent with response: ", response);
        });
    }
}

module.exports = PUSH;