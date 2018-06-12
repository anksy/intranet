'use strict';
angular.module('intranet')
.controller('changePasswordController', 
	['$scope','$rootScope','$state','services', 
	function($scope, $rootScope, $state,services) {
	$scope.user={};

	$scope.submitForm = (form, user) => {
		
		if(form.$valid) {
			//submit form 
			$scope.alert={type:'success',message:'Checking..'};
			$scope.isLoading = true;
			services.http({
				method:'POST',
				url: window._API_PATH.changePassword,
				data: user
			})
			.then( res => {
				$scope.isLoading = false;
				$scope.alert={type:'success',message:res.message};
				$scope.user={};
				form.$setPristine();form.$setUntouched();
				
			})
			.catch(err => {
				//define error
				$scope.isLoading = false;
				$scope.alert=services.getError(err);
			});
		}
	};

}]);

