'use strict';app.controller('EditSitemapController', ['$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','Upload','api_path', '$httpParamSerializer','$mdDialog',"Top",
    function($timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster, Upload, api_path, $httpParamSerializer, $mdDialog,Top) {
    	
    	if(!$routeParams.post_id)
    		$location.path('/sitemap');
        

        $scope.listlinks = function(){
            REST.GET('list-sitemap?'+$httpParamSerializer($rootScope.query)).then(function(response){
                $scope.data = response.output;
                Top.Scroll();
            });
        };

        $scope.listlinks();

    	$scope.getMapLink = function(){
		    REST.GET('get-map-link?_pid='+$routeParams.post_id).then(function(response){
                $scope.cms = response.output;
            });
    	};

    	$scope.getMapLink();


    	$scope.update = function(){
    		delete $scope.cms.created_at;
    		delete $scope.cms.updated_at;
    		REST.POST("update-sitemap?_pid="+$scope.cms._id, $scope.cms).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				$location.path('/sitemap');
    			}

    		});
    	};

        $scope.removeEmLink = function(id, title, ev){
            var confirm = $mdDialog.confirm()
                  .title('Would you really like to delete this record?')
                  .ariaLabel('Delete Record')
                  .targetEvent(ev)
                  .ok('Yes!')
                  .cancel('No');

            $mdDialog.show(confirm).then(function() {
              REST.DELETE("remove-sitemap-link?id="+id+"&post="+title+"&em="+1).then(function(response){
                    if(response.success){
                        $scope.getMapLink();
                        Top.Scroll();
                    }
                    Toaster.simple(response.message,response.success);
                });
            });
        };
        
        $scope.addLink = function(){
            REST.POST("add-sitemap-link?linkonly=1", $scope.cms).then(function(response){
                Toaster.simple(response.message, response.success);
                if(response.success){
                    delete $scope.cms.link;
                    delete $scope.cms.url;
                    $scope.getMapLink();
                    Top.Scroll();
                }
            });
        };
    }

]);