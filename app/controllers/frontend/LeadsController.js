const path = require("path"),
	  jwt  = require("jsonwebtoken"),
	  _    = require("lodash"),
	  mongoose    = require("mongoose"),
	  FORMIDABLE = require("formidable"),
	  FS 	= require("fs"),
	  mv 	= require("mv"),
	  shortid 	= require("shortid"),
	  async 	= require("async"),
	  /**/
	  env     = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
	  error   = require(path.resolve(`./app/config/libs/error`)),
	  DATE    = require(path.resolve(`./app/config/libs/date`)),
	  DECODE  = require(path.resolve('./app/config/libs/verify_jwt')),
	  HELPER  = require(path.resolve('./app/config/libs/helper')),
	  PAGINATE  = require(path.resolve('./app/config/libs/paginate')),
	  App  = require(path.resolve("./app/controllers/frontend/AppController")),
	  Lead = require(path.resolve("./app/models/Lead"));


class LeadsController extends App {
	constructor(){
		super();

		/*
			- add folder --done
			- list folders --done
			- remove folder --done
			- share folder
			- folder details 
			- update all folders --done
			- update folder --done
			- 
		*/

	}

	list(req, res) {
		/*get single post*/
		let query = req.query, match = [{ status: true, trash: false }], or = [],
			page = query.page ? parseInt(query.page) : 1,
			limit = query.limit ? parseInt(query.limit) : env.listing.limit,
			offset = (page - 1) * limit;

		if (query.q) match.push({ title: { $regex: query.q, $options: "i" } });

		/**/
		DECODE.verify(req, res, (user) => {
			/**/
			async.waterfall([
				(_callback) => {
					/*count total objects*/
					Lead.count({ $and: match }, (err, count) => {
						if (err) _callback("Some error occured!");
						_callback(null, count);
					});
				},
				(total, _callback) => {
					Lead.aggregate([
						{ $match: { $and: match } },
						{ $sort: { created_at: -1 } },
						{ $skip: offset },
						{ $limit: limit }
					], (err, results) => {
						if (results) {
							_callback(null, total, results);
						} else {
							_callback("We couldn't found requested data.");
						}
					});

				}
			], (err, total, results) => {
				if (err) res.status(412).json({ type: "error", message: error.oops(), errors: error.pull(err) });
				return res.json({ type: "success", message: "Leads returned", data: results, paging: PAGINATE._paging(total, results, parseInt(page), limit) });
			});
		});
	}



	single(req, res) {
		/*get single post*/
		let query = req.query, match = [{ status: true, trash: false, _id : mongoose.Types.ObjectId(query.leadId) }];

		/**/
		DECODE.verify(req, res, (user) => {
			/**/
			async.waterfall([
				(_callback) => {
					console.log(match)
					Lead.findOne({ $and: match}, (err, result) => {
						if (result) {
							_callback(null, result);
						} else {
							_callback("We couldn't found requested data.");
						}
					});

				}
			], (err, result) => {
				if (err) return res.status(412).json({ type: "error", message: error.oops(), errors: error.pull(err) });
				return res.json({ type: "success", message: "Lead returned", data: result});
			});
		});
	}

	add(req, res) {
		/*get single post*/
		let data = req.body;
		/**/
		data.data.author = mongoose.Types.ObjectId(req.user._id);


		let newLead = new Lead(data.data);
		newLead.save()
			.then(result => res.json({ type: "success", message: "Lead has been saved." }))
			.catch(err => res.status(412).json({ type: "error", errors: error.pull(err) }))
	}

	edit(req, res) {
		/*get single post*/
		let data = req.body, clone = Object.assign({}, data.data);
		/** remove unwanted data */
		delete clone._id;
		delete clone.quoteno;
		delete clone.updated_at;
		delete clone.created_at;
		delete clone.__v;

		/**/
		Lead.findOneAndUpdate({
			_id : mongoose.Types.ObjectId(data.leadId)
		},clone, (err, result) => {

			if (result) return res.json({ type: "success", message: "Lead has been saved." });
			if (err) return res.status(412).json({ type: "error", errors: error.pull(err) });

		});

	}

}

module.exports = LeadsController;