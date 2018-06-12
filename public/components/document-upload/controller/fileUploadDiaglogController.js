'use strict';
angular.module('intranet')
.controller('fileUploadDiaglogController',
 ['$scope','$mdDialog','services','$rootScope','Upload','$timeout','$state',
	($scope,$mdDialog, services , $rootScope,Upload, $timeout, $state) => {
	 
   let params ={
    _id: $rootScope.isLogin._id
  };

  if($state.params && $state.params._id){
    params.folderId = $state.params._id;
  }

	$scope.cancel = () => {
      $mdDialog.cancel();
    };
    $scope.path =null;
    $scope.$watch('folderPath', (folderPath) => {
      if(folderPath){
        $scope.path= folderPath.path; 
      }
        
    });

   
    
  	let uploadFileToServer = (file, key) => {

  		if(!file) { return;}
  		$scope.files[key].isLoading  =1;
      params.file = file;

      if($scope.path){
        params.path =$scope.path ; 
      }
      
  		Upload.upload({
            url:  window._API_PATH.upload_file,
            data: params
        }).then(function (resp) {

        	$scope.files[key].isUploaded = true;
        	$scope.files[key].isLoading =false;

        }, function (resp) {

        	$scope.files[key].isLoading =false;

        }, function (evt) {

            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

            $timeout(() => { 
        		$scope.files[key].isLoading = progressPercentage;
            }, 200);
            
         });

  	};

    $scope.uploadAll = () => {

    	if($scope.files){
    		angular.forEach($scope.files, (value, key) => {
    			if(value.isUploaded == false) uploadFileToServer(value, key);
    		});
    	}
    };
}]);