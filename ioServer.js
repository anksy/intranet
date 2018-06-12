'use strict';

require('dotenv').config({silent: true});
const express 		= require('express'),
	helmet 			= require('helmet'),
	fs 				= require('fs'),
	path 			= require('path'),
	bodyParser 		= require('body-parser'),
	app 			= express(),
	server 			= require('http').createServer(app),
	https 			= require('https'),
	io 				= require('socket.io')(server),
	routes 			= require('./config/routes'),
	config			= require(path.resolve(`./config/env/${process.env.NODE_ENV}`));
	
	/*require database file to connect mongoDB*/
	require('./config/libs/mongoose');

	/*Socket Init*/
	require('./app/socket/socket.js')(io);
	
	/*Listen on Server Port*/
	server.listen(config.server.IO || 8020, function(){
		console.log('listening on', server.address().port);
	});