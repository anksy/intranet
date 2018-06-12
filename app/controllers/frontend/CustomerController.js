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


	  Customer = require(path.resolve("./app/models/Customer"));
	  OTP  = require(path.resolve("./app/models/OTP"));


class CustomerController extends App {
	constructor(){
		super();

		/**/
	}

	listCustomer(req, res){
		/*get single post*/
		let query = req.query, ORconditions = [], conditions = [{status: {$exists : true}}], 
		page = query.page?parseInt(query.page):1,
		limit = query.limit?parseInt(query.limit):env.listing.limit,
		offset = (page-1)*limit;

		if(query.q){
		    /*searching jobs by name matching*/
		    ORconditions.push({
		        "firstname" : { $regex : query.q, $options : "i" }
		    });

		    ORconditions.push({
		        "lastname" :  { $regex : query.q, $options : "i" }
		    });

		    ORconditions.push({
		        "email" : { $regex : query.q, $options : "i" }
		    });

		    ORconditions.push({
		        "mobile" : { $regex : query.q, $options : "i" }
		    });

		    conditions.push({
		        "$or" : ORconditions
		    });
		  }


		DECODE.verify(req, res, (user) => {
			async.waterfall([
		    (_callback) => {
		      /*count total objects*/
		      Customer.count({$and:conditions}, (err, count) => {
		        if(err) _callback("Some error occured!");
		        _callback(null, count);
		      });
		    },
		    (total, _callback) => {
		      Customer.aggregate([
		      {
		      	$match : {$and:conditions}
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
		  ], (err, total, customers) => {
		      if(err) res.status(412).json({type:"error",message:error.oops(),errors:error.pull(err)});

		      if(customers) return res.json({type:"success",message:"Users returned",data:customers, paging:PAGINATE._paging(total,customers,parseInt(page), limit)});
		  });
		});
	}

	oneCustomer(req, res){
		let obj = req.query;

		DECODE.verify(req, res, (user) => {
			Customer.findOne({
				_id : mongoose.Types.ObjectId(obj.userId)
			}, (err, profile) => {
				if(profile){
					res.json({type:"success",message:"Customer Found.",data:profile});
				}else{
					res.json({type:"success",message:"No Customer Found",data:[]});
				}
			});
		});
	}

	addCustomer(req, res){
		let obj = req.body;

		DECODE.verify(req, res, (user) => {
			async.waterfall([
				(_callback) => {
					let newCustomer = Customer(obj.userData);
					newCustomer.save()
					.then(result=>{
						_callback(null, result);
					})
					.catch(err=>_callback(err));
				}
			], (err, result) => {
				if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

				if(result) {

					let newUser = {
						_id : result._id,
						name : result.firstname,
						email : result.email
					};

					res.json({type:"success",message:"Customer has been created successfully.",data:newUser});
				}
			});
		});
	}

	updateCustomer(req, res){
		let obj = req.body;
		DECODE.verify(req, res, (user) => {
			async.waterfall([
				(_callback) => {
					let id = obj.userData._id;
					delete obj.userData._id;
					Customer.findOneAndUpdate({
						_id : mongoose.Types.ObjectId(id)
					}, obj.userData, {
						new : true
					}, (err, updated) => {
						if(err) _callback(err);
						if(updated) _callback(null, updated);
					});
				}
			], (err, result) => {
				console.log(result)
				if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

				if(result) res.json({type:"success",message:"Customer details have been updated.",data:result});
			});
		});
	}


	updateAll(req, res){
		let obj = req.body;

		console.log(obj);

		DECODE.verify(req, res, (user) => {
			async.waterfall([
				(_callback) => {
					obj.status = obj.status===true?true:false;
					Customer.update({
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
							_callback(null, "Customer(s) staus have been updated.");
						}else{
							_callback(null, "None of the customer's status changed.");
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

module.exports = CustomerController;