'use strict';
const nodemailer		 = require('nodemailer'),
	path				 = require('path'),
    hbs                  = require('nodemailer-express-handlebars'),
    sgTransport          = require('nodemailer-sendgrid-transport'),
	config               = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`));


/**
 * [function used to send email]
 * @param  {[type]}   emailId  [email address to send mail]
 * @param  {[type]}   template [handlebar email template]
 * @param  {[type]}   path     [path whether in frontend or backend]
 * @param  {[type]}   context  [Object of data to send in email]
 * @param  {Function} cb       [Callback function]
 * @return {[type]}            [response]
 */


exports.Email = (emailId, template, path, context) =>{
    /**
     * @var {Class Object} [to specify the mail transporter]
     */
    let transporter;

    let options = {
      auth: {
        api_user: config.sendgrid.username,
        api_key: config.sendgrid.password
      }
    };

    if(context.body){
        context.body.from    = config.mail.from;
        context.body.url     = config.base_url;
    }

    transporter = nodemailer.createTransport(sgTransport(options));

    let _options = {
        viewPath: path+'/emails', //Path to email template folder
        extName: '.hbs' //extendtion of email template
    };

    if(path==='app/views/'){
        _options.viewEngine = {
            partialsDir:"./"+path+"/emails/inc/",
            extname : ".hbs"
        };
    }

    //console.log(_options);

    transporter.use('compile', hbs(_options));

    let mailOptions = {
        from: `${config.mail.from} <${config.mail.email}>`,
        to: emailId, 
        subject: context.subject, 
        template: template,
        context : context
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            //cb(error, undefined);
            console.log(error);
            return false;
        }else{
            console.log("Email send to - "+emailId);
            //cb(null, info);
            return false;
        }
    });      
};
