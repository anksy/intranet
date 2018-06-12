const path = require("path"),
	  jwt  = require("jsonwebtoken"),
	  _    = require("lodash"),
	  mongoose    = require("mongoose"),
	  FORMIDABLE = require("formidable"),
	  FS 	= require("fs"),
	  mv 	= require("mv"),
	  async 	= require("async"),
	  /**/
	  env     = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
	  error   = require(path.resolve(`./app/config/libs/error`)),
	  mailer  = require(path.resolve(`./app/config/libs/mailer`)),
	  DECODE  = require(path.resolve('./app/config/libs/verify_jwt')),
	  HELPER  = require(path.resolve('./app/config/libs/helper')),
	  PAGINATE  = require(path.resolve('./app/config/libs/paginate')),
	  IMAGE   = require(path.resolve('./app/config/libs/image')),

	  App  = require(path.resolve("./app/controllers/frontend/AppController")),


	  User = require(path.resolve("./app/models/User"));
	  OTP  = require(path.resolve("./app/models/OTP"));


class EmployeeController extends App {
	constructor(){
		super();

		/**/
	}

	listEmployee(req, res){
		/*get single post*/
		let query = req.query, match={}, 
		page = query.page?parseInt(query.page):1,
		limit = query.limit?parseInt(query.limit):env.listing.limit,
		offset = (page-1)*limit;

		if(query.q){
			match.name={
				$regex : query.q,
				$options : "i"
			}
		}


		DECODE.verify(req, res, (user) => {
			async.waterfall([
		    (_callback) => {
		      /*count total objects*/
		      User.count(match, (err, count) => {
		        if(err) _callback("Some error occured!");
		        _callback(null, count);
		      });
		    },
		    (total, _callback) => {
		      User.aggregate([
		      {
		      	$match : match
		      },
		      {
		        $sort :  {
		          created_at:-1
		        }
		      },
		      {
		        $skip :  offset
		      },
		      {
		        $limit :  limit
		      }
		      ],(err, results) => {
		            if(results){
		                  _callback(null, total, results);   
		            }else{
		                  _callback("We couldn't found requested data.");
		            }
		      });

		    }
		  ], (err, total, emps) => {
		      if(err) res.status(412).json({type:"error",message:ERROR.oops(),errors:ERROR.pull(err)});

		      return res.json({type:"success",message:"Users returned",data:emps, paging:PAGINATE._paging(total,emps,parseInt(page), limit)});
		  });
		});
	}

	oneEmployee(req, res){
		let obj = req.query;

		DECODE.verify(req, res, (user) => {
			User.findOne({
				_id : mongoose.Types.ObjectId(obj.userId)
			},{
				password : 0,
				auth : 0
			}, (err, profile) => {
				if(profile){
					res.json({type:"success",message:"User Found.",data:profile});
				}else{
					res.json({type:"success",message:"No User Found",data:[]});
				}
			});
		});
	}

	addEmployee(req, res){
		let obj = req.body;

		DECODE.verify(req, res, (user) => {
			console.log(obj);
			async.waterfall([
				(_callback) => {
					/*only superadmin can add employees*/
					if(user.usertype==='superadmin'){
						_callback(null);
					}else{
						_callback("Only Superadmin can add employees.");
					}
				},

				(_callback) => {
					if(obj.userData) obj.userData.isEmailActive = true;
					let newUser = User(obj.userData);
					newUser.save()
					.then(result=>{
						mailer.Email(obj.email,'newUser','app/views/',{body:obj,subject:"Welcome to Intranet"});
						_callback(null, result);
					})
					.catch(err=>_callback(err));
				}
			], (err, result) => {
				if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

				if(result) {

					let newUser = {
						_id : result._id,
						name : result.name,
						email : result.email
					};

					res.json({type:"success",message:"User has been registered successfully.",data:newUser});
				}
			});
		});
	}

	updateEmployee(req, res){
		let obj = req.body;

		DECODE.verify(req, res, (user) => {
			async.waterfall([
				(_callback) => {
					/*only superadmin can add employees*/
					if(user.usertype==='superadmin'){
						_callback(null);
					}else{
						_callback("Only Superadmin can perform this action.");
					}
				},

				(_callback) => {
					obj.isEmailActive = true;
					User.findOneAndUpdate({
						_id : mongoose.Types.ObjectId(obj.userId)
					}, obj.userData, {
						new : true
					}, (err, updated) => {
						if(err) _callback(err);
						if(updated) _callback(null, updated);
					});
				}
			], (err, result) => {
				if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

				if(result) res.json({type:"success",message:"User details have been updated.",data:result});
			});
		});
	}


	updateAll(req, res){
		let obj = req.body;

		console.log(obj);

		DECODE.verify(req, res, (user) => {
			async.waterfall([
				(_callback) => {
					/*only superadmin can add employees*/
					if(user.usertype==='superadmin'){
						_callback(null);
					}else{
						_callback("Only Superadmin can perform this action.");
					}
				},

				(_callback) => {
					obj.status = obj.status===true?true:false;
					User.update({
						_id : {
							$in : obj.users
						}
					}, {
						status : obj.status
					}, {
						multi : true
					}, (err, updated) => {
						if(err) _callback(err);
						if(updated.nModified) {
							_callback(null, "User(s) staus have been updated.");
						}else{
							_callback(null, "None of the user's status changed.");
						}
					});
				}
			], (err, result) => {
				if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

				if(result) res.json({type:"success",message:result});
			});
		});
	}

}

module.exports = EmployeeController;