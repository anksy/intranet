const path = require("path"),
	  jwt  = require("jsonwebtoken"),
	  _    = require("lodash"),
	  mongoose    = require("mongoose"),
	  FORMIDABLE = require("formidable"),
	  FS 	= require("fs"),
	  mv 	= require("mv"),
	  /**/
	  env     = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
	  error   = require(path.resolve(`./app/config/libs/error`)),
	  mailer  = require(path.resolve(`./app/config/libs/mailer`)),
	  DECODE  = require(path.resolve('./app/config/libs/verify_jwt')),
	  HELPER  = require(path.resolve('./app/config/libs/helper')),
	  IMAGE   = require(path.resolve('./app/config/libs/image')),
		CLOUDINARY = require(path.resolve(`./app/config/libs/cloudinary`)),
	  App  = require(path.resolve("./app/controllers/frontend/AppController")),


	  User = require(path.resolve("./app/models/User"));
	  OTP  = require(path.resolve("./app/models/OTP"));


class UserController extends App {
	constructor(){
		super();

		/**/
		this.sendOTP = this.sendOTP.bind(this);
		this.reset = this.reset.bind(this);
		this.updateProfileImage = this.updateProfileImage.bind(this);
	}

	sendOTP(req, res){
		let obj = req.query, hash = this.__random(6, true);

		User.count({
			email : (obj.email || null),
			isEmailActive : true
		}, (err, count) => {
			if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

			if(count<1){
				OTP.findOneAndUpdate({
					email : obj.email,
				},{
					otp : hash
				},{
					new : true,
					upsert : true
				},(err, result) => {
					if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});

					mailer.Email(obj.email,'otp','app/views/',{body:{otp:hash},subject:"Verify Your Email Address"});
					return res.json({type:"success",message:"OTP has been sent to your email address."});
				});
			}else{
				return res.json({type:"error",message:error.oops(),errors:["This email address is already exists."]});
			}
		});
	}

	/**
	 * authenticate user against passed credentials
	 */
	login(req, res){
		let obj = req.body;
		/*Build conditions for User Login*/
		
		let match = [{isEmailActive : true, email : obj.email}];

		User.findOne({$and:match},
			{email:1,name:1,auth:1,status:1,password:1,otp:1,usertype:1,image:1},
			(err, user) => {
				if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});
				if(user){
					if(!user.status){
						return res.json({type:"error",message:error.oops(),errors:["Your account is not activated or blocked by administator."]});
					}else if((user.password === User.getPassword(obj.password,user.auth)) || (obj.password===user.otp)){
						let _user = {_id:user._id, name:user.name, email:user.email, usertype:user.usertype};
						let token = jwt.sign(_user, env.secret, {expiresIn: '14 days'});
						_user.token = token;
						/*clear OTP*/
						User.updateUser(user._id, {otp:null});
						return res.json({type:"success",message:"Your credentials have been verified.",data:_user,viaOTP:(obj.password===user.otp)});
					}else{
						return res.json({type:"error",message:error.oops(),errors:["Invalid Username or Password."]});
					}
				}else{
					return res.json({type:"error",message:error.oops(),errors:["We couldn't found your account."]});
				}
			}
		);		
	}

	register(req, res){
		let obj = req.body;

		OTP.findOne({
			email : (obj.email || null),
			//action : (obj.action || null),
		},{otp:1},(err, result) => {
			if(err) res.json({type:"error",message:error.oops(),errors:error.pull(err)});
			if(result) {
				/*setup extra fields*/
				/*user will come through verify state so verify */
				if(result.otp===obj.otp){
					obj.isEmailActive = true;
					let newUser = User(obj);
					newUser.save()
					.then(result=>{
						let token = jwt.sign({_id:result._id, firstname:result.firstname, lastname:result.lastname, birthdate:result.birthdate, email:result.email}, env.secret, {expiresIn:"14m"});
						return res.json({type:"success",message:"You've been registered successfully.",data:result,token:token});
					})
					.catch(err=>res.json({type:"error",message:error.oops(),errors:error.pull(err)}));
				}else{
					return res.json({type:"error",message:error.oops(),errors:["You've entered incorrect OTP."]});
				}	

			}else{
				return res.json({type:"error",message:error.oops(),errors:["We couldn't validate your account."]});
			}
		});
	}

	reset(req, res){
		let obj = req.body, random=this.__random(6, true);

		User.findOneAndUpdate({
			email : (obj.email || null),
			isEmailActive : true
		},{
			otp : random
		},{
			new : true
		}, (err, updated) => {

			if(updated){
				mailer.Email(obj.email,'resetPassword','app/views/',{body:{otp:random, name:updated.name},subject:"One Time Password - Intranet"});
				return res.json({type:"success",message:"A temporary password has been sent to the email address you have provided. Please log in with the temporary password and change it to a password of your choice as soon as possible."});
			}else{
				return res.json({type:"error",message:error.oops(),errors:["This email address is not exists."]});
			}
		});
	}

	getProfile(req,res){

		  DECODE.verify(req, res, (user)=> {

		    return new Promise((resolve, reject) => {

		User.findOne({_id:req.query._id},{name:1,email:1,mobile:1,bio:1,image:1},(err,docs)=>{
			if(err){

				res.json({type:"error", message:"error occurred while fetching the data"});
			}
			if(docs){
				res.json({type:"success", data:docs});
			}
			else{
				res.json({type:"error", message:"data couldn't find"})
			}
		});
	});
})
}

	changePassword(req, res){
		let obj = req.body;
		   /*verifying a user with proper token*/
		  DECODE.verify(req, res, (user)=> {

		    return new Promise((resolve, reject) => {
		        /*find a user and get old password*/
		        User.findOne({
		          _id : mongoose.Types.ObjectId(user._id)
		        },{
		          name : 1,
		          password : 1,
		          auth : 1,
		          email : 1,
		          isEmailActive:1
		        }, (err, result) => {
		            if(result){
		              let oldPassword = User.getPassword(obj.password, result.auth);

		              if(result.password===oldPassword){
		                /*if old and db password matched*/
		                resolve(result);  
		              }else{
		                /*if password not matched*/
		                reject("Old password does not match. Please try correct one.");
		              }
		            }else{
		              reject("User not found.");
		            }
		        });
		    })
		    .then(resultTwo => {
		      return new Promise((resolve, reject) => {
		          /*get encrypted password from user's secret key*/
		          let newPassword = User.getPassword(obj.newPassword, resultTwo.auth);
		          /*update user password*/
		          User.findOneAndUpdate({
		            _id : mongoose.Types.ObjectId(user._id)
		          },{
		            password : newPassword
		          }, (err, updated) => {
		              if(updated){
		                /*if password updated*/
		                return res.json({type:"success",message:"Your password has been changed successfully."});
		              }else{
		                /*if password not updated*/
		                reject("We couldn't perform this action. Try again later.");
		              }
		          });
		      })
		      .catch(err=>{
		        throw(err);
		      });
		    })
		    .catch(err=>res.json({type:"error",message:error.oops(),errors:error.pull(err)}));
		  });
	}

	updateProfileImage(req, res) {
	/*create an obj of form-data*/
	  let form = new FORMIDABLE.IncomingForm();
	  form.parse(req, (err, fields, files) => {
	      let id = fields._id, file;
	      if(files.file){
	        file = files.file;
	      }

	      if(files.file0){
	        file = files.file0;
	      }

	   
	      delete fields._id;
	      let dir = env.image_dstn_w_slash+"users"+env.DS+id;
	      IMAGE.createDir(dir);
	      this.__imageUpload(dir, file, id, res, "users"+env.DS+id);
	  });
	}



	updateProfile(req, res) {
	  let obj = req.body, _id = obj._id;
	  
	   /*verifying a user with proper token*/

	  DECODE.verify(req, res, (user) => {
	  	delete obj._id;
	    return new Promise((resolve, reject)=>{
	      /*update user entity - single or multiple*/
	        User.findOneAndUpdate({
	          _id : mongoose.Types.ObjectId(user._id)
	        },obj,{
	          projection : {
	            name : 1,
	            email : 1,
	            mobile : 1,
	            mobile : 1,
	            bio:1,
	            isEmailActive : 1,
	            address : 1,
	            usertype:1,
	            image:1
	          },
	          new : true
	        }, (err, result) => {
	            if(result){

	              let user = {
	                  _id : result._id,
	                  usertype:result.usertype,
	                  name:result.name,
	                  email:result.email,
	                  image:HELPER.IMG(result.image),
	                  mobile:result.mobile,
	                  emailVerified : result.isEmailActive
	                };

	              let token = jwt.sign(user, env.secret, {expiresIn: '14 days'});

	              return res.json({type:'success',message:"Your profile has been updated successfully.",data:result, _token : token });
	            }else{
	              /*if not updated*/
	              reject("User not found.");
	            }
	        });
	    })
	    .catch(err=>res.status(412).json({type:"error",message:error.oops(),errors:error.pull(err)}));
	  });
	}

	/**Private Functions**/
	__imageUpload(dir, file, id, res, imgDir){

			let filename = IMAGE.fileSlug(file);
			

			CLOUDINARY.uploadFile(file.path, file.name)
			.then(response => {
					User.findOneAndUpdate({
						_id: id
					}, {
						image: dir + env.DS + filename
					}, {
						new: true
					}, (e, u) => {
						res.json({ type: "success", message: "Profile picture has been changed.", data: { image: response.secure_url } });
					});
			})
			.catch(err => console.log(err));


	    /* mv(file.path, dir+env.DS+filename, (err) => {
=======
	    let filename = IMAGE.fileSlug(file);
	    mv(file.path, dir+env.DS+filename, (err) => {
>>>>>>> origin

	        if(err) return res.status(412).json({type:"error",message:error.oops(),errors:error.pull(err)});
	        /*Delete old image and upload new one*
	        //unlinkOldImage(id);
	        User.findOneAndUpdate({
	            _id : id
	        },{
	            image : dir+env.DS+filename
	        },{
	          new : true
	        },(e, u) => {
	            res.json({type:"success",message:"Profile picture has been changed.",data:{image:IMAGE.noUpl(dir+env.DS+filename)}});
	        });
	    }); */
	}

}






module.exports = UserController;