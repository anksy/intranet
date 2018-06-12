'use strict';
app.controller('AddBlockController', ['$scope', '$rootScope', '$location', 'REST','Toaster','Upload','api_path',
    function($scope, $rootScope, $location, REST, Toaster, Upload, api_path) {

        /*Set Type*/
        $scope.cms = {type:"cms-block"};
        /*Type - CMS Block*/
    	$scope.add = function(){
    		REST.POST("add-post", $scope.cms).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				$location.path('/blocks');
    			}
    		});
    	};

        $scope.addWithImage = function(file){
            if(!file){
                $scope.add();
                return;
            }
            var File = {file: file};
            angular.merge(File,$scope.cms);
            $rootScope.loader=true;
            file.upload = Upload.upload({
              url: api_path+'add-post-with-file',
              data: File,
            });

            file.upload.then(function (response) {
              $rootScope.loader=false;
              Toaster.simple(response.data.message, response.data.success);
                if(response.data.success){
                    $location.path('/blocks');
                }
            }, function (response) {
              $rootScope.loader=false;
              if (response.status > 0)
                $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
              // Math.min is to fix IE which reports 200% sometimes
              file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        };
    }

]);