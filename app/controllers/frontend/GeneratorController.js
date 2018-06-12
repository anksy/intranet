const path = require("path"),
    jwt = require("jsonwebtoken"),
    _ = require("lodash"),
    mongoose = require("mongoose"),
    FORMIDABLE = require("formidable"),
    FS = require("fs"),
    mv = require("mv"),
    shortid = require("shortid"),
    async = require("async"),
    /**/
    env = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    error = require(path.resolve(`./app/config/libs/error`)),
    DATE = require(path.resolve(`./app/config/libs/date`)),
    DECODE = require(path.resolve('./app/config/libs/verify_jwt')),
    HELPER = require(path.resolve('./app/config/libs/helper')),
    PAGINATE = require(path.resolve('./app/config/libs/paginate')),
    App = require(path.resolve("./app/controllers/frontend/AppController")),
    Lead = require(path.resolve("./app/models/Lead"));


class GeneratorController extends App {
    constructor() {
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

    quote(req, res) {
        /*get single post*/
        var fs = require('fs');
        var pdf = require('html-pdf');
        var html = fs.readFileSync(path.resolve('./test.html'), 'utf8');
        var options = { format: 'Letter' };

        console.log("Test.........")

        pdf.create(html, options).toFile('./test.pdf', function (err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
        });
    }

}

/* var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync(path.resolve('./index.html'), 'utf8');
var options = { 
    "height": "11.3in",        // allowed units: mm, cm, in, px
    "width": "8.7in",

    "border": "0",   
    format: 'A3',
    // base: 'file://' + __dirname + '/image/',
    base: 'file:///E:/node/andersen/intranet/image/',
    paginationOffset: 1,       // Override the initial pagination number
};

console.log("Test.........", 'file://' + __dirname + '/image/')

pdf.create(html, options).toFile('./index.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
});

 */

module.exports = GeneratorController;