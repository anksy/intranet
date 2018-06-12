'use strict';
angular.module('intranet')
.controller('personalInfoController', 
	['$scope','$rootScope','$state','services', 
	function($scope, $rootScope, $state,services) {

		//get profile data 
		$scope.user={_id: $rootScope.isLogin._id};

		let getProfile = () => {

			services.http({
				method:'GET',
				url: window._API_PATH.getProfile,
				params:{_id: $rootScope.isLogin._id}
			})
			.then( res => {

				$scope.isLoading = false;
				$scope.user = res.data;
			})
			.catch(err => {
				console.log(err);
				//define error
				$scope.isLoading = false;
				$scope.alert=services.getError(err);
			});
		};

		getProfile();

		$scope.submitForm = (form, user) => {
			
			if(form.$valid) {
				//submit form 
			services.http({
				method:'PUT',
				url: window._API_PATH.updateProfile,
				data:$scope.user 
			})
			.then( res => {
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

