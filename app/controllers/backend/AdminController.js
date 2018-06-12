'use strict';


const crypto            = require('crypto'),
    path                = require('path'),
    mongoose            = require('mongoose'),
    jwt                 = require('jsonwebtoken'),
    async               = require('async'),
    decodeJwt           = require(path.resolve('./app/config/libs/verify_jwt')),
    Mailer              = require(path.resolve('./app/config/libs/mailer')),
    Admin               = require(path.resolve('./app/models/admin')),
    env                 = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    secret              = new Buffer(env.secret).toString('base64');


exports.login = (req, res) => {
    Admin.findOne({
        username: req.body.username
    }, {
        firstname: 1,
        lastname: 1,
        email: 1,
        password: 1,
        type : 1,
        image : 1,
        status : 1,
        bio :1
    }, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            console.log(user);
            if (!user || !user.matchPassword(req.body.password)) {
                res.json({
                    user : "",
                    token: "",
                    message: 'invalid username or password',
                    success: false
                });
            } else if(!user.status){
                res.json({
                    user : "",
                    token: "",
                    message: 'your account is not active.',
                    success: false
                });
            } else {
                user = { 
                     status: user.status,
                     image: user.image,
                     type: user.type,
                     lastname: user.lastname,
                     firstname: user.firstname,
                     _id: user._id
                };

                let token = jwt.sign(user, secret, {expiresIn : "14 days"});
                
                
                res.json({
                    user : user,
                    token: token,
                    success: true,
                    message: 'You have been logged in successfully.'
                });

            }
        }
    });
};


exports.profile = (req, res) => {
   /*check for a valid token*/
   decodeJwt.run(req, secret, (data) => {
        /*fetch admin data from jwt token*/
        Admin.findOne({
            "_id": data._id
        }, {
            firstname: 1,
            lastname: 1,
            email: 1,
            type:1,
            username:1,
            image:1,
            mobile : 1,
            bio :1
        }, function(err, result) {
            if(result){
                res.json({success:true,message:"Success",output:result});
            }else{
                res.json({success:false,message:"User not exists."});
            }
        });
   });
};

exports.updateProfile = (req, res) => {
   decodeJwt.run(req, secret, (id) => {
        Admin.findOneAndUpdate(
        {"_id": id},
        req.body,
        { runValidators: true, context: 'query' },
        function(err, result) {
            if(err){
                /*if any error occured*/
                var errs = [];
                for(var e in err.errors){
                    errs.push(err.errors[e].message);
                }
                res.json({success:false,message:errs.join("\n")});
                return;
            }

            if (result) {
                res.json({
                    success: true,
                    message: "Your profile has been updated successfully."
                });
            } else {
                res.json({
                    success: false,
                    message: "some errors occurred "
                });
            }
        });        
   });
};

exports.changePassword = (req, res) => {
    /*check if password supplied*/
    if (req.body.password && req.body.currentPassword) {
        Admin.findById(req.body._id, (err, user) => {
            /*If current password matches with saved one*/
            if (user && user.matchPassword(req.body.currentPassword)) {
                Admin.update({
                    "_id": req.body._id
                }, {
                    "$set" : {
                        "password": user.encryptPassword(req.body.password)
                    }
                }, (err, update) => {
                    
                    if (update) {
                        res.json({
                            success: true,
                            message: "Your password has been changed successfully."
                        });   
                    }else{

                        res.json({
                            success: false,
                            message: "Some errors occurred"
                        }); 
                    }
                });
            } else {
                res.json({
                    success: false,
                    message: "Your old password does not match."
                });
            }
        });
    } else {
        res.json({
            success: false,
            msg: "Please provide password"
        });
    }
};

/**
 * [Used to generate forgot password link and send to requested used.]
 * @param  {[Obj]} req [Request]
 * @param  {[Obj]} res [Response]
 * @return {[Obj]}     [Reply from server]
 */
exports.forgot = (req, res) => {
    /*fetch request body*/
    let body =  req.body;
    /*find user from admin collection and send a reset password link*/
    Admin.findOneAndUpdate({
        "username": body.username
    },{
        resetKey : crypto.randomBytes(10).toString('hex')
    },{
        new : true
    }, (err, admin) => {
        if(admin){
            /*Send email to user*/
            admin.subject = "Reset Password Link";
            admin.from    = env.mail.from;
            admin.url     = env.admin_base_url;
            
            /*Send mail */
            Mailer.Email(admin.email,'forgot','admin/backend',{admin:admin,subject:"Forgot Your Password"});

            res.json({success:true,message:"We've sent an email to reset your password."});
        }else{
            res.json({success:false,message:"We've sent an email to reset your password."});
        }
    });
};


exports.reset = (req, res, next) => {
    /*fetch request body*/
    let body =  req.body;
    /*find user from admin collection and send a reset password link*/
    Admin.findOneAndUpdate({
        "resetKey": body.key
    },{
        resetKey : "",
        password : Admin.hashPassword(body.password)
    },{
        new : true
    }, (err, admin) => {
        if(admin){
            res.json({success:true,message:"Your password has been updated."});
        }else{
            res.json({success:false,message:"This link is not valid. Please request for a new reset password link."});
        }
    });
};

exports.changeAvatar = (req, res, next) => {
    /*fetch request body*/
    let body =  req.body;
    /*check for a valid token*/
   decodeJwt.run(req, secret, (data) => {
        /*find user from admin collection and send a reset password link*/
        console.log(req.files);
        if (Array.isArray(req.files)) {
            console.log(req.files[0]);
            let path = req.files[0].path.replace(env.image_destination+"/", "/"); 
            console.log(path);
            Admin.update({
                "_id": data._id
            }, {
                "$set": {
                    "image": path
                }
            }, (err, result) => {
                if (result.nModified === 1) {
                    res.json({
                        success: true,
                        message: "Avatar has been changed.",
                        output: path
                    });
                } else {
                    res.json({
                        success: false,
                        message: "Some error occurred."
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: "Please choose an image to upload as Avatar."
            });
        }
    });
};