'use strict';

const mongoose          =   require('mongoose'),
    path                =   require('path'),
    config              =   require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    schema              =   mongoose.Schema;

    var otpSchema = new schema({
        email: String,
        otp:    String,
        action : {type:String, default:"EmailVerification"},
        status : {
            type : Boolean,
            default : false
        }
    },{
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'         
        }
    });

    module.exports = mongoose.model('otp', otpSchema);