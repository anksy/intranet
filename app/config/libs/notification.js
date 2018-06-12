'use strict';

const ASYNC = require('async'),
      mongoose 	= require('mongoose'),
	  PATH = require('path'),
      ObjectId = mongoose.Types.ObjectId,
      PAGINATE     = require(PATH.resolve('./config/libs/paginate')),
	  NOTIFICATION = require(PATH.resolve('./app/models/notification')),
      env  = require(PATH.resolve(`./config/env/${process.env.NODE_ENV}`));

class Notification {

	/*Magic Function for our class*/
	/*This function initialize all configurations for this class or module*/
	constructor(){

	}
	
	/*this function will save a notification for users*/
	save(req) {
		if(req.userId) new ObjectId(req.userId);
		let notification = new NOTIFICATION(req);
		notification.save()
		.then(result=>true)
		.catch(err=>false);
	}

	/*get all notifications by user id*/
	getByUserId(user_id, callback) {
		NOTIFICATION.find({
			user_id : user_id
		}).sort({createdAt:-1}).limit(100).exec((err, result) => {
			callback(err, result);
		});
	}
	
	/*get total notification number which are unread yet*/
	getCountByUserId(userId) {
		if(userId) new ObjectId(userId);
		return new Promise((resolve, reject)=>{
			NOTIFICATION.count({ userId: userId , read: false}).exec( (err, count) => {
				if(err) reject(0);
				resolve(count);
			});
		});
	}

	/*mark a notification read based on user and notification id*/
	markAsRead(user_id) {
		if(user_id) new ObjectId(user_id);
	
		return new Promise((resolve, reject)=>{
			NOTIFICATION.update(
				{userId: user_id, read : false},
				{$set: {read: true}},
				{multi:true},
				(err, result) => {
				if(err) reject(false);
				resolve(true);
			});
		});
	}

	getAll(req) {
		if(req.userId) new ObjectId(req.userId);
		let page = req.page || 1, match={userId: new ObjectId(req._id)}, limit = req.limit?parseInt(req.limit):env.listing.limit,offset=(page-1)*limit;
		return new Promise((resolve, reject)=>{
			ASYNC.waterfall([
				(_callback) => {
					NOTIFICATION.count({userId: req._id,read:false}).exec((err, count)=>{
						_callback(null, count);
					});
				},

				(total, _callback) => {
					if(req.q) {
						match.title = {
							$regex : req.q,
							$options: "i"
						};
					}
					
					NOTIFICATION.aggregate([
						{
							$match : match
						},
						{
							$project : {
								title : 1,
								content : 1,
								createdAt: 1,
								type : 1,
								timestamp: { $subtract: [ "$createdAt", new Date("1970-01-01") ] }
							}
						},
						{
							$sort : {
								createdAt : -1
							}
						},
						{
							$skip : offset
						},
						{
							$limit : limit
						}
					], (err, result) => {
						_callback(null, total, result);
					});
				}
			], (err, total, result) => {
				if(err) reject(err);
				resolve({
					total : total,
					list : result,
					paging : PAGINATE._paging(total,result,parseInt(page), limit)
				});
			});
		});
	}

	/*removes a notification by id*/
	delete(user_id, notification_id) {
		if(user_id) new ObjectId(user_id);
		if(notification_id) new ObjectId(notification_id);

		return new Promise((resolve, reject)=>{
			NOTIFICATION.remove({ _id: notification_id, userId: user_id }, {$set: {read: true}}, (err, result) => {
				if(err) reject(false);
				resolve(true);
			});
		});
	}
}

module.exports = Notification;