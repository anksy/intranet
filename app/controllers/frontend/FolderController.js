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
	  mailer  = require(path.resolve(`./app/config/libs/mailer`)),
	  attachment  = require(path.resolve(`./app/config/libs/image`)),
	  CLOUDINARY  = require(path.resolve(`./app/config/libs/cloudinary`)),
	  DECODE  = require(path.resolve('./app/config/libs/verify_jwt')),
	  HELPER  = require(path.resolve('./app/config/libs/helper')),
	  PAGINATE  = require(path.resolve('./app/config/libs/paginate')),
	  IMAGE   = require(path.resolve('./app/config/libs/image')),

	  App  = require(path.resolve("./app/controllers/frontend/AppController")),


	  Folder = require(path.resolve("./app/models/Folder")),
	  User = require(path.resolve("./app/models/User"));


class FolderController extends App {
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

	listFolders(req, res){
		/*get single post*/
		let query = req.query, match=[{status:true, trash:false}], or=[], 
		page = query.page?parseInt(query.page):1,
		limit = query.limit?parseInt(query.limit):env.listing.limit,
		offset = (page-1)*limit;

		
		if(query.q) match.push({title:{$regex : query.q, $options : "i"}});

		/**/
		DECODE.verify(req, res, (user) => {
			/**/
			let parentDirId = null;
			if (query.folderId) {
				match.push({ parent: mongoose.Types.ObjectId(query.folderId) });
				parentDirId = mongoose.Types.ObjectId(query.folderId);
			} else {
				match.push({ parent: { $exists: false } });
			}

			if (query.resourceType) match.push({ resourceType: query.resourceType});

			
			or.push({access: { $in : [user._id.toString()] }});
			or.push({type: "public"});
			or.push({created_by: mongoose.Types.ObjectId(user._id)});
			match.push({
	            "$or" : or
	        });


			async.waterfall([
		    (_callback) => {
		      /*count total objects*/
		      Folder.count({$and:match}, (err, count) => {
		        if(err) _callback("Some error occured!");
		        _callback(null, count);
		      });
			},
				(count, _callback) => {
				/*count total objects*/
					Folder.findOne({ status: true, trash: false, _id: parentDirId }, { path: 1, title:1, breadcrumb:1 }, (err, parentDir) => {
					if (err) _callback("Some error occured!");
					_callback(null, count, parentDir);
				});
			},
				(total, parentDir, _callback) => {
		      Folder.aggregate([

				{
					$lookup: {
						from: "folders",
						localField: "_id",
						foreignField: "parent",
						as : "children"
					}
				},

				  {
					  $lookup: {
						  from: "users",
						  localField: "created_by",
						  foreignField: "_id",
						  as: "owner"
					  }
				  },

				  {$unwind : "$owner"},
		      {
		      	$match : {
		      		$and : match
		      	}
		      },
		      {
				  $project: { "owner.name": 1, "created_by":1,  "children.resourceType": 1, "children.title": 1, title : 1, type : 1, resouces : 1, resourceType : 1, created_at:1, updated_at:1, mimeType:1, breadcrumb: 1, attachment:1, slug:1, path:1, insensitive : { "$toLower": "$title" }, }
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
						_callback(null, total, parentDir, results);   
		            }else{
		                  _callback("We couldn't found requested data.");
		            }
		      });

		    }
			], (err, total, parentDir, results) => {
		      if(err) res.status(412).json({type:"error",message:ERROR.oops(),errors:ERROR.pull(err)});

				return res.json({ type: "success", message: "Folders returned", data: results, parentDir: parentDir ? parentDir : undefined, paging:PAGINATE._paging(total,results,parseInt(page), limit)});
		  });
		});
	}

	addFolder(req, res){
		let obj = req.body;

		DECODE.verify(req, res, (user) => {
			obj.created_by = user._id;
			if (obj.parent) obj.parent = obj.parent ? mongoose.Types.ObjectId(obj.parent) : null;

			if (obj.breadcrumb) obj.breadcrumb = obj.breadcrumb;

			obj.type = (obj.type && obj.type==='public')?'public':'private';
			obj.status = true;
			if(obj._id) delete obj._id;

			let newFolder = new Folder(obj);
			newFolder.save()
			.then(result=>{
				Folder.updatePath(obj.path, result);
				res.json({type:"success", message:"Directory has been created", data:result});
			})
			.catch(err=>res.json({type:"error", message:error.oops(), errors:error.pull(err)}));
		});
	}

	removeFolder(req, res){
		let obj = req.body;

		DECODE.verify(req, res, (user) => {
			Folder.update({
				path : { $regex : obj.path, $options : "i" },
				created_by : mongoose.Types.ObjectId(user._id),
			},{
				trash: true
			},{
				multi : true
			}, (err, result) => {
				if(err) return res.json({type:"error", message:error.oops(), errors:error.pull(err)});
				if(result) return res.json({type:"success", message:"Directory has been removed."});
			})
		});
	}

	updateFolder(req, res){
		let obj = req.body;	
		DECODE.verify(req, res, (user) => {
			async.waterfall([
				(_callback) => {
					Folder.findOneAndUpdate({
						_id : mongoose.Types.ObjectId(obj.folderId),
						//created_by : mongoose.Types.ObjectId(user._id)
					}, obj.folder, {
						new : true
					}, (err, updated) => {
						if(err) _callback(err);
						if(updated) _callback(null, updated);
					});
				}
			], (err, result) => {
				if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

				if(result) res.json({type:"success",message:"Directory details have been updated.",data:result});
			});
		});
	}


	updateAll(req, res){
		let obj = req.body;

		DECODE.verify(req, res, (user) => {
			async.waterfall([

				(_callback) => {
					obj.actionValue = obj.actionValue===true?true:false;
					Folder.update({
						_id : {
							$in : obj.dirs
						},
						created_by : mongoose.Types.ObjectId(user._id)
					}, {
						[obj.action] : obj.actionValue
					}, {
						multi : true
					}, (err, updated) => {
						if(err) _callback(err);
						if(updated.nModified) {
							_callback(null, "Directories status have been updated.");
						}else{
							_callback(null, "None of the Directory's status changed.");
						}
					});
				}
			], (err, result) => {
				if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

				if(result) res.json({type:"success",message:result});
			});
		});
	}


	shareFolder(req, res){
		let obj = req.body;

		DECODE.verify(req, res, (user) => {
			async.waterfall([

				(_callback) => {
					Folder.findOneAndUpdate({
						path: { $regex: obj.path, $options: "i" },
						created_by : mongoose.Types.ObjectId(user._id)
					}, {
							access: (obj.access && obj.access.length) ? obj.access.map(userId => mongoose.Types.ObjectId(userId)) : []
					}, {
						new : true
					}, (err, updated) => {
						if(err) _callback(err);
						if(updated) {
							_callback(null, "Access has been updated.");
						}else{
							_callback(null, "You're not authorized to update the access of this directory.");
						}
					});
				}
			], (err, result) => {
				if(err) return res.json({type:"error",message:error.oops(),errors:error.pull(err)});

				if(result) return res.json({type:"success",message:result});
			});
		});
	}


	uploadFile (req, res) {

	    let form = new FORMIDABLE.IncomingForm(),files=[], fields={}, messages=[], totalFileSize=0;
	    /*parse incoming form for files and fields......*/
	    
	    form.on('field', (field, value) => {
	        fields[field] = value;
	    })

	    form.on('file', (field, file) => {
	        files.push(file);
	    })

	    form.on('end', () => {
	        req.body._id = fields._id;
	        DECODE.verify(req, res, (user)=>{

	            let data = {
					title: fields.title ? fields.title : shortid.generate(),
					path: fields.path ? fields.path:"",
	                created_by : user._id,
	                resourceType : "file",
					status: true,
					slug: shortid.generate()
	            };
	            

	            /*assigning into folder...*/
				if (fields.folderId) data.parent = mongoose.Types.ObjectId(fields.folderId);

	            if(files && files.length){
   
	                /*if received multiple files then process them parallelly*/
	                /*create directory dynamically based on conversation*/
	                /*let dir = env.image_dstn_w_slash+"conversation"+env.DS+fields.folderId;
	                    attachment.createDir(dir);*/

	                async.eachOf(files, 
		                        (file, key, callback) => {
	                    /* Save file on server*/
	                        let filename = attachment.fileSlug(file);
	                        let _data = {};
	                         /*assign message body with file name*/
	                        _data.title = filename;
	                        
	                        _data.mimeType = file.type;
	                        
	                        

	                        /**
	                        FS.rename(file.path, dir+env.DS+filename, (err) => {
	                            messages.push(Object.assign(_data, data));
	                            callback(false);
	                        });
	                        */

	                        CLOUDINARY.uploadFile(file.path, file.name)
	                        .then(response => {
	                            _data.attachment = response;
	                            messages.push(Object.assign(_data, data));
	                            callback(false);
	                        })
	                        .catch(err => console.log(err));

	                      /* End save file code*/
	                    
	                },
	                (err) => {
	                  /*update user details*/

	                    Folder.insertMany(messages, (err, insertedMany) => {
	                      if(insertedMany){
	                        return res.json({type:"success",message:"Your file has been uploaded.", data:insertedMany});
	                      }else{
	                        return res.status(412).json({type:"error",message:error.oops(),errors:error.pull(err)});
	                      }
	                    });
	                   
	                });

	            }else{
	                res.status(412).json({type:"error",message:error.oops(),errors:["File can't be blank or empty."]});
	            }
	        })
	        
	    });
	    form.parse(req);
	}

	getUsersofDir(req, res){
		let obj = req.query, match = {};

		async.waterfall([
			(callback) => {
				Folder.findOne({
					_id: mongoose.Types.ObjectId(obj.folderId)
				}, {
						access: 1, created_by:1
					}, (err, result) => {
						if (result) {
							callback(null, result.access, result.created_by);
						} else {
							callback(null, []);
						}
					});
			},
			(shared, owner, callback) => {

				match.$and = [
					{ _id: { $in: shared } },
					{ _id: { $ne: owner } },
				];

				if (obj.type && obj.type==='non-shared'){
					 shared.push(owner);
					match = { _id : { $nin: shared} };
				}


				User.find(match, { name: 1, email: 1, mobile: 1, status : 1 }, (err, users) => {
					if (users) {
						callback(null, users);
					} else {
						callback(null, []);
					}
				});
			}
		], (err, users) => {
			if (users) res.json({ type: "success", message: "User list returned.", data: users });
			if (err) res.status(412).json({ type: "error", message: error.oops(), errors: error.pull(err) });
		});
	}

	removeAccess(req, res){
		let obj  = req.body;

		async.waterfall([
			(callback) => {
				Folder.findOne({
					_id : mongoose.Types.ObjectId(obj.folderId),
					created_by: req.user._id
				},{
					access : 1
				}, (err, result) => {
					if (result){
						if (result.access.indexOf(obj.userId) >= 0){
							callback(null);
						}else{
							callback("The directory or file is not assign to this user.");	
						}
					}else{
						callback("You're not allowed to perform this action.");
					}
				});
			},

			(callback) => {
				Folder.update({
					_id: mongoose.Types.ObjectId(obj.folderId)
				}, {
					$pull : {
						access: mongoose.Types.ObjectId(obj.userId)
					}
				}, (err, result) => {
					console.log(result)
					if (result.nModified) {
						callback(null);
					} else {
						callback("This operations can't not completed. Please try again later.");
					}
				});
			}
		], (err) => {
			if (!err) {
				res.json({ type: "success", message: "Access has been removed."});
			}else{
				res.status(412).json({ type: "error", message: error.oops(), errors: error.pull(err) });
			}
		});
	}

}

module.exports = FolderController;