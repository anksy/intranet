'use strict';
const path 	 		  = require('path'),
      _ 				  = require('lodash'),
      fs          = require('fs'),
	    twilio 		  = require('twilio'),
  	  config 			= require(path.resolve(`./config/env/${process.env.NODE_ENV}`));

let [accountSid, authToken] = [config.twilio.account,config.twilio.token]; // Your Account SID & Token from www.twilio.com/console
let client = new twilio(accountSid, authToken);

module.exports = {
	sms : (body,number) => {
    client.messages.create({
        body: body,
        to: config.twilio.code+number,  // Text this number
        from: config.twilio.number // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
	},

  validNumber : (number, callback) => {
    client.lookups.v1
    .phoneNumbers(config.twilio.code+number)
    .fetch()
    .then(number=>callback(true))
    .catch(err=>callback(false));
  }
};