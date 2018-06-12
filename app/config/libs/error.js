'use strict';
const path 	 		    = require('path'),
      _ 				= require('lodash'),
	    fs 				= require('fs'),
  	  config 			= require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`));

module.exports = {
	pull : (err) => {
    let errs = [];

    console.log("-------------------------err");
    console.log(err);

    if(typeof err === "string") 
      errs.push(err);
    
    if(err && err.errors){
      for(let e in err.errors){
          errs.push(err.errors[e].message);
      }
    }
    

    if(errs.length===0){
      errs.push("We couldn't proceed with your request. Please try again later.");
    }
    return errs;
	},
  oops : (err='OOPS! Some error occured.') => {
    return err;
  },
  cant : (err="We couldn't proceed with your request. Please try again later.") => {return err;},
  jwt : (err="You're not authorized to access this module.") => {return err;},
  extract : (message, deliminator) => {
    let messageParser = message.split(deliminator);
    if(messageParser[messageParser.length-1]){
      if(messageParser[messageParser.length-1].search("Cast to Date")>=0){
        messageParser[messageParser.length-1] = "Settlement Date is not correct"; 
      }
    }
    return messageParser[messageParser.length-1];
  }
};