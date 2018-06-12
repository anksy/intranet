'use strict';
angular.module('intranet')
.controller('myProfileController', ['$scope','$rootScope','$state', 
	function($scope, $rootScope,$state) {
		
		$scope.goto = (state) =>$state.go(state);
		$scope.currentNavItem =$state.current.name;

		if($state.current.name ==='myProfile'){
			$state.go('myProfile.personalInfo');
		}
}]);

