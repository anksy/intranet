'use strict';
angular.module('intranet')
.controller('changePictureController', 
	['$scope','$rootScope','$state','Upload','services','$timeout', 
	function($scope, $rootScope, $state, Upload,services,$timeout) {

		
		if($rootScope.isLogin && $rootScope.isLogin.image){
			// $scope.myImage=$rootScope.isLogin.image ;
		
		}else{
			// $scope.myImage= 'assets/images/no-picture.png';
		}

	$scope.myCroppedImage='';

	$scope.onSelectImage = function (file) {

	    if (file) {
	    	if(!window.checkImage(file.type)) {
	    		$scope.isError =true;
	    		return false;
	    	}else{
	    		$scope.isError =false;
	    	}
	      $scope.isUploading = true;
	      $scope.isLoading = true;
	      $scope.isChangeImage = true;
	      $scope.imageName = file.name;
	      var reader = new FileReader();
	      reader.onload = function (file) {

	        $scope.$apply(function ($scope) {
	          $scope.myImage = file.target.result;
	          $timeout(() => { $scope.isUploading = false; }, 500);
	        });
	      };
	      reader.readAsDataURL(file);
	    }
	  };

	
	$scope.cancelCrop = ()  => {
		$scope.myImage='';
		$scope.myCroppedImage='';
		$scope.isError =false;
	};
      

	$scope.UploadForm = (form) => {
		
		if(form.$valid) {
			 $scope.isUploading = true;
			//submit form 
			Upload.upload({
		        url: window._API_PATH.updateProfileImage,
		        data: {
		          file: Upload.dataUrltoBlob($scope.myCroppedImage, $scope.imageName),
		          _id: $rootScope.isLogin._id,
		        }
		    }).then(function (response) {
		        //if image is sucessfully uploaded
		        $rootScope.isLogin.image = response.data.data.image;
		        console.log( $rootScope.isLogin.image);
		       	//update session
		       	$rootScope.updateUserSession();
		        $scope.isUploading = false;
		        $scope.cancelCrop();

		    }, function (err) {
		        $scope.alert = services.getError(err);
		        $scope.isUploading = false;
		    }, function (evt) {

		        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		    });
		}
	};

}]);

window.checkImage = (type) => {
	console.log(type);
	
	if(type.indexOf('image') >=0) {
		return true;
	}else{
		return false;
	}
};

