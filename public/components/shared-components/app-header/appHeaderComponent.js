'use strict';
angular.module('intranet')
.directive('appHeader',[function(){
	return {
		templateUrl:'components/shared-components/app-header/views/header.html'
	};
}]);