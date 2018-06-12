'use strict';
angular.module('intranet')
.controller('customerCRMController', ['$scope','$rootScope','$state','services','$q', 
	function($scope, $rootScope,$state,services, $q) {
		
	$scope.actionType ='select';
	$scope.paging={};
	$scope.isFilter =false;
	$scope.selected = [];
	$scope.getList = () => {
		$scope.promise= $q((resolve, reject) => {

			let params = $scope.paging ? $scope.paging : {};
				params._id = $rootScope.isLogin._id;
			return services.http({
				method:'GET',
				url: window._API_PATH.listCustomer ,
				params:params
			})
			.then( res => {
				$scope.isLoading = false;
				$scope.users = res; 
				$scope.paging = res.paging;
				resolve(res);
			})
			.catch(err => {
				//define error
				$scope.isLoading = false;
				$scope.alert=services.getError(err);
				services.notify(services.getError(err).message , 'error');
				reject(err);
			});
		});

	};

	$scope.getList();
	

	$scope.refresh = () => {
		$state.reload();
	};

	$scope.filterResult = (search) => {
		 $scope.paging.q = search;
		 $scope.getList();  
	};

	$scope.closeFilter = () => {
		$scope.isFilter = !$scope.isFilter;
		if($scope.isFilter ==false ){
		 $scope.getList(); 
		}
	};

	$scope.changeStatus = () => {

		if($scope.actionType =="select") {
			services.notify('Please select action type', 'error');
		}else{
			let status =$scope.actionType =='activate' ? true : false; 
			$scope.isProcessing =true;
			services.http({
				method:'PUT',
				url:window._API_PATH.updateAllEmployees,
				data:{users :$scope.selected , status:status  }
			})
			.then( res => {
				services.notify(res.message);
				$scope.getList();
				$scope.isProcessing =false;
				$state.reload();

			}).catch(err => {
				//define error
				$scope.alert=services.getError(err);
				services.notify(services.getError(err).message , 'error');
				$scope.isProcessing =false;
			});
		}
	};
	

}]);

