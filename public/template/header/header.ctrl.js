'use strict';
/*
header template
 */
console.log("header tpl333333333");

angular.module('intranet')
//header template
.directive('header', ['$rootScope', function($rootScope){
	console.log("ASDASDASD");
	return {
		templateUrl:'template/header/header.html', 
	};
}]);

