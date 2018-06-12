'use strict';
angular.module('intranet')
.controller('addCustomerController', ['$scope','$rootScope','$state','services','$timeout', 
	function($scope, $rootScope,$state,services, $timeout) {
	$scope.user={};

	let request = {
			url: window._API_PATH.addEmployee,
			method:'POST',
			data: {_id:$rootScope.isLogin._id}
		};

	// $scope.state =$state.current.name;
	// // $scope.user={ permissions :[] };
	
	// $scope.isEdit =false;
	// //get user list 
	
	// if($state.current.name==='updateUser') {
	// 	$scope.isPageLoading =true;
	// 	//update request params
	// 	request.url = window._API_PATH.updateEmployee //update URL
	// 	request.method ="PUT";
	// 	request.data.userId = $state.params.id;

	// 	if(!$state.params.id){ return; }
	// 	$scope.isEdit =true;

	// 	services.http({
	// 			method:'GET',
	// 			url: window._API_PATH.getEmployee,
	// 			params:{userId: $state.params.id,_id:$rootScope.isLogin._id}
	// 		}).then( res => {
	// 			$scope.user= res.data ;
	// 			$timeout(() => { $scope.isPageLoading =false;}, 300);
				

	// 		}).catch(err => {
	// 			$timeout(() => { $scope.isPageLoading =false;}, 300);
	// 			history.go(-1);
	// 			services.notify(services.getError(err).message , 'error');
	// 		});
	// }


	$scope.submitForm = (form, user) => {
		if(form.$valid){

			$scope.isLoading = true;

			services.http({
				url: window._API_PATH.addCustomer,
				method:'POST',
				data: {_id:$rootScope.isLogin._id, userData: user}
			})
			.then( res => {
				$scope.isLoading = false;
				$scope.user={};
				form.$setPristine();
				form.$setUntouched();

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

