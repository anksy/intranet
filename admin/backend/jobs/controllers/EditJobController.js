'use strict';app.controller('EditJobController', ['$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','Upload','api_path', '$httpParamSerializer','$mdDialog',
    function($timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster, Upload, api_path, $httpParamSerializer, $mdDialog) {
    	
    	if(!$routeParams.post_id)
    		$location.path('/jobs/category');

        $rootScope.query.type = "category";
        $rootScope.query.order = "title";
        

        $scope.listCategory = function(){
            $rootScope.query.id = $routeParams.post_id;
            REST.GET('with-parent?'+$httpParamSerializer($rootScope.query)).then(function(response){
                $scope.categories = response.output.records;
            });
        };

        $scope.listCategory();
    	$scope.getCategoryPost = function(){
            var url;
            if(($routeParams.post_id).search("_") >=0 ) {
                var split = ($routeParams.post_id).split("_");
                url = 'get-post?_pid='+split[0]+'&_sid='+split[1];
            }else{
                url = 'get-post?_pid='+$routeParams.post_id;
            }
		    REST.GET(url).then(function(response){
                if(response.success){
                    $scope.cms = response.output;
                    if(response.output.editing==='child'){
                        $scope.cms = {
                            parent : $scope.cms._id,
                            _id  : $scope.cms.children[0]._id,
                            title : $scope.cms.children[0].title,
                            shortDesc : $scope.cms.children[0].shortDesc,
                            image : $scope.cms.children[0].image,
                            status : $scope.cms.children[0].status
                        };
                    }
                    if($scope.cms && !$scope.cms.parent){
                        $scope.cms.parent = "root";
                    }
                }else{
                    $location.path('/jobs/category');
                }
    		    	
		    });
    	};

    	$scope.getCategoryPost();

        $scope.removeSubCategory = function(_id, sub_id, ev){
            var confirm = $mdDialog.confirm()
                  .title('Would you really like to delete this record?')
                  .ariaLabel('Delete Record')
                  .targetEvent(ev)
                  .ok('Yes!')
                  .cancel('No');

            $mdDialog.show(confirm).then(function() {
              REST.DELETE("delete-post?post="+_id+"&sub_post="+sub_id).then(function(response){
                    if(response.success){
                        $scope.getCategoryPost();
                    }
                    Toaster.simple(response.message,response.success);
                });
            });
        };

    	$scope.updateCategory = function(){
    		delete $scope.cms.created_at;
    		delete $scope.cms.updated_at;
    		REST.POST("update-post?_pid="+$scope.cms._id, $scope.cms).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				$location.path('/jobs/category');
    			}

    		});
    	};

        $scope.editCategoryWithImage = function(file){
            if(!file){
                $scope.updateCategory();
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