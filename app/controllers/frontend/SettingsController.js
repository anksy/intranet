'use strict';


const path = require("path"),
      jwt  = require("jsonwebtoken"),
      _    = require("lodash"),
      mongoose    = require("mongoose"),
      formidable = require("formidable"),
      FS    = require("fs"),
      mv    = require("mv"),
      shortid   = require("shortid"),
      async     = require("async"),
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

      App  = require(path.resolve("./app/controllers/frontend/AppController")),


      Settings = require(path.resolve("./app/models/setting"));


class SettingsController extends App {
    constructor(){
        super();

        /**/
        this.updateWithImage = this.updateWithImage.bind(this);
    }


    getSettings(req, res){
        let columns = req.body;
        /*check for a valid token*/
        DECODE.verify(req, res, (data) => {
                /*fetch admin data from jwt token*/
                Settings.find({}, {meta_key:1,meta_value:1}, (err, settings)=>{
                    if(settings){
                        res.json({success:true,message:"Settings",output:settings});
                    }else{
                        res.json({success:false,message:"Settings",output:[]});
                    }
                });
        });
    }


    updateWithImage(req, res) {
    /*fetch request body*/
    let body =  req.body;
    /*check for a valid token*/
        //DECODE.verify(req, res, (data) => {
            /*parse form to get file*/
            let form = new formidable.IncomingForm();
            form.parse(req, function(err, fields, files) {
                let file = files.file;
                /*Move image to destination*/

                CLOUDINARY.uploadFile(file.path, file.name)
                .then(response => {
                    Settings.findOneAndUpdate({
                        meta_key: "logo"
                    }, {
                            meta_value: response.secure_url
                    }, {
                        upsert: true
                    }, (err, newSetting) => {
                        req.body = fields;
                        SettingsController.updateSettingFunc(req, res);
                    });
                })
                    .catch(err => res.json({ success: false, message: "We couldn't proceed with this request. Please try again later.", error: err }));
            });
        //});
    }

    static updateSettingFunc(req, res) {
        let columns = req.body;
        /*check for a valid token*/
        DECODE.verify(req, res, (data) => {
            /*fetch admin data from jwt token*/
            for (let key in columns) {
                if(key !== '_id'){
                    Settings.findOneAndUpdate(
                    { meta_key: key },
                    { meta_value: columns[key] },
                    { upsert: true },
                    (err, newSetting) => {
                        //
                    });
                }
            }
            res.json({ success: true, message: "Settings have been updated." });
        });
    }

}

module.exports = SettingsController;

