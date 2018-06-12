'use strict';
app.factory('timeout', ['$timeout', function ($timeout) {
	return{

		hundredMiliSeconds: function(cb){
			$timeout(function(){
				cb();
			},100);
		},

		twoSecond: function(cb){
			$timeout(function(){
				cb();
			},2000);			
		}

	};
}]);