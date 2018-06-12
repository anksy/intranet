'use strict';
const path 	 		= require('path'),
	async 	 		= require('async'),
	_ 				= require('lodash'),
	fs 				= require('fs'),
	mongoose 		= require('mongoose'),
	slugify			= require('slugify'),
	OS              = require('os'),
    iplocation      = require('iplocation'),
    browser 		= require('detect-browser'),
    User            = require(path.resolve('./app/models/User')),
    MAILER          = require(path.resolve('./app/config/libs/mailer')),
    DATE            = require(path.resolve('./app/config/libs/date')),
	ObjectId		= require("mongoose").Types.ObjectId,
  	config 			= require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`));


let noTrailingSlash = function noTrailing(string){
	//return string.replace(/\/$/, "");
	return string;
}

let IMG = function IMG(file){
	return (file)?noTrailingSlash(config.base_url)+file:"";
}

let image = function image(file){
	return (file)?(config.base_url.replace(/\/+$/, ''))+file:"";
}


let IPCleanUP = function IPCleanUP(IP){
	return _.replace(IP,"::ffff:","");
}

let noUploads = function noUploads(path){
	return _.replace(path,"./uploads/","");
}

module.exports = {
	IMG : (file) => {
		return IMG(file);
	},
	image : (file) => {
		return image(file);
	},
	replaceBase : (uri) => {
		if(!uri) return "";
		return uri.replace(config.base_url,"");
	},
	IPCleanUP : (IP) => {
		return IPCleanUP(IP);
	},
	noUploads : (path) => {
		return noUploads(path);
	}
};