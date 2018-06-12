'use strict';
angular.module('intranet')
.controller('addNewFolderController', ['$scope','$mdDialog','services','$rootScope','data','$state',
	($scope,$mdDialog, services , $rootScope,data, $state) => {
	$scope.cancel = () => {
      $mdDialog.cancel();
    };
	$scope.hideFolder=true;
    $scope.data = data;

	if($state.params && $state.params._id) {
		$scope.hideFolder=false;
	}
    $scope.submitForm = (form, data) => {


    	if(form.$valid) {
    		$scope.isLoading =true; 
			let request ={}; data._id = $rootScope.isLogin._id;
			angular.copy(data, request);

			if(data.parent && data.parent._id){
				request.parent = data.parent._id; 
			}

			if($state.params && $state.params._id){
				request.parent =  $state.params._id; 
			}

			if($scope.data && $scope.data.path){
				request.path = $scope.data.path.path ; 
				request.breadcrumb = $scope.data.path.breadcrumb;
				// request.breadcrumb.push({_id:$scope.data.path._id, title:$scope.data.path.title});

			}
    		services.http({ url: window._API_PATH.addDir, method:'POST', data: request})
			.then( res => {
				$scope.isLoading = false;
				 $mdDialog.cancel(res);
			})
			.catch(err => {
				//define error
				$scope.isLoading = false;
				$scope.alert=services.getError(err);
			});
    	}
    };
}]);