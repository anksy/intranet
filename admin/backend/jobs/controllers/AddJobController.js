'use strict';app.controller('AddJobController', ['$scope', '$rootScope', '$location', 'REST','Toaster','api_path','Upload', '$httpParamSerializer',
    function($scope, $rootScope, $location, REST, Toaster, api_path, Upload, $httpParamSerializer) {

        /*Set Type*/
        $scope.cms = {type:"category"};
        $rootScope.query.type = "category";
        $rootScope.query.order = "title";

        $scope.listCategory = function(){
            REST.GET('list-posts?'+$httpParamSerializer($rootScope.query)).then(function(response){
                $scope.categories = response.output.records;
            });
        };

        $scope.listCategory();

        /*Type - Pages*/
    	$scope.addCategory = function(){
    		REST.POST("add-post", $scope.cms).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				$location.path('/jobs/category');
    			}
    		});
    	};

        $scope.addCategoryWithImage = function(file){
            if(!file){
                $scope.addCategory();
                return;
            }
            var File = {file: file};
            angular.merge(File,$scope.cms);
            $rootScope.loader = true;
            file.upload = Upload.upload({
              url: api_path+'add-post-with-file',
              data: File,
            });

            file.upload.then(function (response) {
              $rootScope.loader = false;
              Toaster.simple(response.data.message, response.data.success);
                if(response.data.success){
                    $location.path('/jobs/category');
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