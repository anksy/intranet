'use strict';

const jwt 	= require('jsonwebtoken'),
	  mongoose = require('mongoose'),
	  PATH  = require('path'),
	  ERROR = require(PATH.resolve('./app/config/libs/error')),
	  env   = require(PATH.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
	  SECRET= env.secret;

exports.run = (req, key, callback) => {
	let token = req.headers.authorization.replace('Bearer ', "");
	jwt.verify(token, key, function(err, decodedToekn){
		callback(decodedToekn);
	});
};

exports.verify = (req, res, callback) => {
	let token = req.headers.authorization.replace('Bearer ', "");
	jwt.verify(token, SECRET, (err, decodedToekn) => {
		let userId = req.body._id || req.query._id;

		if (!req.query) { req.query = {}; }

		if (userId && !mongoose.Types.ObjectId.isValid(userId)) return res.status(412).json({ type: "error", message: ERROR.oops(), errors: ["User id not valid."] });
		if (req.query.folderId && !mongoose.Types.ObjectId.isValid(req.query.folderId)) return res.status(412).json({ type: "error", message: ERROR.oops(), errors: ["Folder id not valid."] });

		if(!userId) return res.status(412).json({type:"error",message:ERROR.oops(),errors:["User id not provided."]});

		if(userId===decodedToekn._id){
			callback(decodedToekn);
		}else{
			return res.status(417).json({type:"error",message:"Invalid token",errors:[ERROR.jwt()]});
		}
	});
};

exports.verified = (req, res, next) => {
	let token = req.headers.authorization.replace('Bearer ', "");
	jwt.verify(token, SECRET, (err, decodedToekn) => {
		let userId = req.body._id || req.query._id;

		if (!req.query) { req.query = {}; }

		if (userId && !mongoose.Types.ObjectId.isValid(userId)) return res.status(412).json({ type: "error", message: ERROR.oops(), errors: ["User id not valid."] });
		if (req.query.folderId && !mongoose.Types.ObjectId.isValid(req.query.folderId)) return res.status(412).json({ type: "error", message: ERROR.oops(), errors: ["Folder id not valid."] });

		if (!userId) return res.status(412).json({ type: "error", message: ERROR.oops(), errors: ["User id not provided."] });

		if (userId === decodedToekn._id) {
			req.user = decodedToekn;
			next();
		} else {
			return res.status(417).json({ type: "error", message: "Invalid token", errors: [ERROR.jwt()] });
		}
	});
};