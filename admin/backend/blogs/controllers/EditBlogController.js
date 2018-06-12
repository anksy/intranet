'use strict';
app.controller('EditBlogController', ['$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','Upload','api_path',
    function($timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster, Upload, api_path) {
    	
    	if(!$routeParams.post_id)
    		$location.path('/blogs');

    	$scope.getPost = function(){
		    REST.GET('get-post?_pid='+$routeParams.post_id).then(function(response){
		    	$scope.cms = response.output;
		    });
    	};

    	$scope.getPost();

    	$scope.update = function(){
    		delete $scope.cms.created_at;
    		delete $scope.cms.updated_at;
    		REST.POST("update-post?_pid="+$scope.cms._id, $scope.cms).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				$location.path('/blogs');
    			}

    		});
    	};

        $scope.editWithImage = function(file){
            if(!file){
                $scope.update();
                return;
            }

            var File = {file: file};
            angular.merge(File,$scope.cms);
            $rootScope.loader = true;
            file.upload = Upload.upload({
              url: api_path+'edit-post-with-file',
              data: File,
            });

            file.upload.then(function (response) {
              $rootScope.loader = false;
              Toaster.simple(response.data.message, response.data.success);
                if(response.data.success){
                    $location.path('/blogs');
                }
            }, function (response) {
              $rootScope.loader = false;
              if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
              // Math.min is to fix IE which reports 200% sometimes
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };
    }

]);