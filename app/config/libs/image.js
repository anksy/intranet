'use strict';
const path 	 		= require('path'),
	async 	 		= require('async'),
	_ 				= require('lodash'),
	fs 				= require('fs'),
	mongoose 		= require('mongoose'),
	slugify			= require('slugify'),
	ObjectId		= require("mongoose").Schema.Types.ObjectId,
    
  	config 			= require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`));


let filePath = function file(file) {
	return file.replace("./"+config.image_destination,"");
}

let fileSlug = function slug(file, name=false) {
	if(!file) return false;
	let filename,  t = file.type, flname = file.name.split(".");
    let ext = t.split('/');
    //filename = slugify([(file.name).replace("."+ext[1],""),"-",random(5),"."+ext[1]].join("-"),'-').replace("+xml","");
    filename = slugify([flname[0],random(8).toLowerCase(),"."+flname[(flname.length)-1]].join("")).replace("+xml","");

    if(name){
    	filename = slugify(name+'.'+name[(name.length)-1],'-').replace("+xml","");
    }
	return filename;
};

let dirStr = function structure(dir){
	let parts = dir.split('/'),ar=[],folder;
	parts.map(part => {
		ar.push(part);
		folder = ar.join('/');
		if(folder!=='.'){
			if(!fs.existsSync(folder)){
              fs.mkdirSync(folder);
            }
		}
	});
	return folder;
};

let fileMove = function moveFile(file, dir, callback){
	dirStr(dir);
	let filename = fileSlug(file), fileToMove = filePath(dir+config.DS+filename);
	fs.rename(file.path, dir+config.DS+filename, (err) => {
        if(err){
            callback(err, false);
        }
        callback(null, fileToMove);    
    });
}

let random = function random(number) {
	let string = "QWERTYUIOPLKJHGFDSAZXCVBNM12346790";
	let rand = string.split('');
	let shuffle = _.shuffle(rand);
	let num = _.slice(shuffle,0,number);
	return num.join("");
}

module.exports = {
	createDir : dirStr,
	fileSlug : fileSlug,
	file : filePath,
	move : fileMove,
	checkQuota : (id) => {
		//let size = parseFloat(file.size).toFixed(2);
		return new Promise((resolve, reject)=>{
			User.findOne({
				_id : id
			},{
				_id : 0,
				plan : 1
			}, (err, result)=>{
				if(err) reject(err);
				resolve(result);
			});
		});
	},
	updateQuota : (obj,id) => {
		User.update({
			_id : id
		},{
			$set : {
				plan : obj
			}
		},(err, updated) => {
			if(updated) return true; else return false;
		});
	},
	remove : (file) => {
		fs.unlink(file, (e,r)=>{
            /*Respective image will be removed*/
        });
	},
	random : () => {
		return random(6);
	},
	noUpl : (file) => {
		return file.replace(config.image_dstn_w_slash, "");
	}
};