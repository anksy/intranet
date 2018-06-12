'use strict';app.controller('EditFaqController', ['$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','Upload','api_path',
    function($timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster, Upload, api_path) {
    	
    	if(!$routeParams.post_id)
    		$location.path('/faq');

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
    				$location.path('/faq');
    			}

    		});
    	};

    }

]);