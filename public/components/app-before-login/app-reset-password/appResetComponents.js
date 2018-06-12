'use strict';
angular.module('intranet')
.controller('resetPasswordController', ['$scope','$rootScope','services','$state', 
	function($scope, $rootScope, services,$state) {

		$scope.submitForm = (form, user) => {
		
			if(form.$valid) {
				

				$scope.alert={type:'success',message:'Processing..'};
				$scope.isLoading = true;
				
				services.http({
					method:'POST',
					url: window._API_PATH.resetPassword,
					data: user
				})
				.then( res => {
					$scope.isLoading = false;
					$scope.alert={type:'success',message:res.message};
				})
				.catch(err => {
					//define error
					$scope.isLoading = false;
					$scope.alert=services.getError(err);
				});
			}
		};
	
}]);

