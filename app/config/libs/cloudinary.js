'use strict';
const path 	 		    = require('path'),
      _ 				= require('lodash'),
	  fs 				= require('fs'),
	  cloudinary 		= require('cloudinary'),
	  _GLOBAL           = require(path.resolve('./app/config/global/function')),
  	  config 			= require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`));

/*set basic configurations*/
cloudinary.config(config.cdn);


module.exports = {
	/*upload files to server*/
	uploadFile : (file, filename=false) => {

		let options = {resource_type: "auto"}, ext='';
		if(filename) {
			ext = filename.split(".")[filename.split(".").length-1];
			ext = ext.toLowerCase();
		}

		return new Promise((resolve, reject) => {
			if(ext) options.public_id = _GLOBAL.random(12)+"."+ext;
			cloudinary.v2.uploader.upload(file, options, (err, result) => {
			  	if(err) reject(err); // if any error
			  	if(result) resolve({public_id:result.public_id, url: result.url, secure_url: result.secure_url, bytes:result.bytes}); // if file uplaoded to cloud
			});
		});
	},

	/*delete files from cloud*/
	deleteFile : (fileId) => {
		/*delete file from cloud*/
		/*source - https://cloudinary.com/documentation/node_image_upload*/
		return new Promise((resolve, reject) => {
			cloudinary.v2.uploader.destroy(fileId, 
    		{invalidate: true}, 
    		(error, removed) => {
    			if(error) reject(error); //if any error
    			if(removed) resolve(removed); //if image removed from server
    		});
		});
		// Note : Forcing cache invalidation is done by setting the invalidate parameter to true either when deleting an image or uploading a new one. Note that it usually takes up to one hour for the CDN invalidation to take effect.
	}

}