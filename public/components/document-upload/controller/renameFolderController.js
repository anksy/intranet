'use strict';
angular.module('intranet')
.controller('renameFolderController', ['$scope','$mdDialog','services','$rootScope','data',
	($scope,$mdDialog, services , $rootScope,data) => {
	$scope.cancel = () => {
      $mdDialog.cancel();
    };
    $scope.user =data.folderActive; 
  
    $scope.submitForm = (form, data) => {

    	if(form.$valid) {
    		$scope.isLoading = true;
			let request ={ folderId:  data._id, folder : {title : data.title}};
			request._id = $rootScope.isLogin._id;

    		services.http({ url: window._API_PATH.updateDir, method:'PUT', data: request})
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