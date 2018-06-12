'use strict';
const mongoose = require('mongoose'),
    path =   require('path'),
    config = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`));

class Database {

	constructor(){
		this.db = config.db.name;
	}

	dBconnection(mongoose){
		/*turn on debug mode - print mongo query on terminal*/
		mongoose.set('debug', config.debug_mongo);

		mongoose.Promise = global.Promise;

		/*connect mongoDB*/
		mongoose.connect(config.db.URL, {useMongoClient:true});

		/*if database connected successfully*/
		mongoose.connection.on('connected', (err, result) => {
		    console.log(`Successfully connected to DB: ${this.db}`);
		});

		/*if unable to connect to DB*/
		mongoose.connection.on('error', (err) => {
		    console.log(`Failed to connect to DB: ${this.db}, ${err}`);
		});

		/*if connection has been break due to any reason*/
		mongoose.connection.on('disconnected', (err) => {
			console.log(`Default connection to DB: ${this.db} disconnected`);
		});

	}

	/*bind all functions together into single function*/
	dbConnect(){
		this.dBconnection(mongoose);
	}
}

module.exports = Database;