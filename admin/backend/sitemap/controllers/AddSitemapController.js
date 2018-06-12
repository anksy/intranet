'use strict';app.controller('AddSitemapController', ['$scope', '$rootScope', '$location', 'REST','Toaster','api_path','Upload', '$httpParamSerializer',
    function($scope, $rootScope, $location, REST, Toaster, api_path, Upload, $httpParamSerializer) {

        $scope.listlinks = function(){
            REST.GET('list-sitemap?'+$httpParamSerializer($rootScope.query)).then(function(response){
                $scope.data = response.output;
                //Top.Scroll();
            });
        };

        $scope.listlinks();

        /*Type - Pages*/
    	$scope.add = function(){
    		REST.POST("add-sitemap-link", $scope.cms).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				//$location.path('/sitemap');
    			}
    		});
    	};
    }

]);