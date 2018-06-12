/*
Singletons – Each component dependent on a service gets a reference to the 
single instance generated by the service factory

Socket.IO enables real-time bidirectional event-based communication.
It works on every platform, browser or device, focusing equally on reliability and speed.

	factory services
 */
'use strict';
app

.factory('socket', ['$timeout','$rootScope','socketURL', 
	function($timeout,$rootScope,socketURL){

		var services={};

		var socket =io.connect(socketURL);
		
		services.on = function (eventName, callback) {
			
			socket.on(eventName, function () {  
				var args = arguments;
				$rootScope.$apply(function () {
					callback.apply(socket, args);
				});
			});

		};

		services.emit= function (eventName, data, callback) {

			socket.emit(eventName, data, function () {
				var args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			});

		};
			
		return services;
	}
]);