'use strict';
angular.module('intranet')
.controller('updateCustomerController', ['$scope','$rootScope','$state','services','$timeout', 
	function($scope, $rootScope,$state,services, $timeout) {
	$scope.user={};
	if(!$state.params.id){
		window.history.go(-1);
	}
	$scope.isPageLoading = true;
	$scope.isEdit =true; 
	
	let request = {
		url: window._API_PATH.addEmployee,
		method:'POST',
		data: {_id:$rootScope.isLogin._id}
	};
	services.http({
			method:'GET',
			url: window._API_PATH.getCustomer,
			params:{userId: $state.params.id,_id:$rootScope.isLogin._id}
		}).then( res => {
			$scope.user= res.data ;
			$timeout(() => { $scope.isPageLoading =false;}, 300);
			

		}).catch(err => {
			$timeout(() => { $scope.isPageLoading =false;}, 300);
			history.go(-1);
			services.notify(services.getError(err).message , 'error');
		});

	$scope.submitForm = (form, user) => {
		if(form.$valid){

			$scope.isLoading = true;

			services.http({
				url: window._API_PATH.updateCustomer,
				method:'PUT',
				data: {_id:$rootScope.isLogin._id, userData: user}
			})
			.then( res => {
				$scope.isLoading = false;
				$scope.alert={type:'success', message:res.message };
			})
			.catch(err => {
				//define error
				$scope.isLoading = false;
				$scope.alert=services.getError(err);
			});
		}
	};

}]);

