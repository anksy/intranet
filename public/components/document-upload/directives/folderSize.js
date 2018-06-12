'use strict';

angular.module('intranet')
//scroll to top 
.directive('folderSize', ['$timeout','$rootScope','$mdDialog','services', 
	function ($timeout,$rootScope,$mdDialog,services) {

	return {
		template:'{{size}}',
		scope:{folderSize:'='},
		link:(scope, ele) => {

			scope.$watch('folderSize', (size) => {
				if(size){
					scope.size=bytesToSize(size);
				}
			});
		}

	};
}]);


function bytesToSize(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}