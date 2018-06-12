'use strict';app.controller('SitemapController', ['$mdDialog', '$cookies', '$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','$httpParamSerializer','Top',
    function($mdDialog, $cookies, $timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster,$httpParamSerializer,Top) {

    	$scope.listlinks = function(){
		    REST.GET('list-sitemap?'+$httpParamSerializer($rootScope.query)).then(function(response){
		    	$scope.data = response.output;
                Top.Scroll();
		    });
    	};

    	$scope.listlinks();

        $scope.sync = function(){
            REST.GET("sync-sitemap")
            .then(function(response){
                $scope.listlinks();
            });
        };

    	$scope.removeLink = function(_id, ev){
    		var confirm = $mdDialog.confirm()
		          .title('Would you really like to delete this record?')
		          .ariaLabel('Delete Record')
		          .targetEvent(ev)
		          .ok('Yes!')
		          .cancel('No');

		    $mdDialog.show(confirm).then(function() {
		      REST.DELETE("remove-sitemap-link?post="+_id).then(function(response){
	    			if(response.success){
	    				$scope.listlinks();
	    			}
	    			Toaster.simple(response.message,response.success);
	    		});
		    });
    	};
    }
]);