'use strict';
const multer			= require('multer'),
	path 				= require('path'),	
	fs 					= require('fs'),	
	image 				= require(path.resolve("./app/config/libs/image")),	
	env					= require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
	crypto 				= require('crypto');


exports.saveImage = (data) => {
	return multer({  
	    storage: multer.diskStorage({
	    	destination: "./"+env.image_destination,
	    	filename:  (req, file, cb)=> {
	    		cb(null, `${Date.now()}${crypto.randomBytes(6).toString('hex')}${env.image_extensions[file.mimetype]}`);
	  		}
	    })  
	}).any();
};

/*
exports.saveAttachment = () => {
	return multer({  
	    storage: multer.diskStorage({
	    	//destination: "./"+env.image_destination,
	    	destination : (req, file, cb) => {
	    		if(req.body.conversationId){
	    			let baseDir = "./"+env.image_destination+env.DS+"conversation"+env.DS+req.body.conversationId;
	    			image.(baseDir);
	    		}
	    	},
	    	filename:  (req, file, cb)=> {
	    		cb(null, `${Date.now()}${crypto.randomBytes(6).toString('hex')}${env.image_extensions[file.mimetype]}`);
	  		}
	    })  
	}).any();
};*/