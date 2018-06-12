'use strict';app.controller('EditManagerController', ['$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster',
    function($timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster) {
    	
    	if(!$routeParams.manager_id)
    		$location.path('/managers');

    	$scope.getUser = function(){
		    REST.GET('get-manager?_mid='+$routeParams.manager_id).then(function(response){
		    	$scope.admin = response.output;
		    });
    	};

    	$scope.getUser();

    	$scope.updateUser = function(){
    		delete $scope.admin.created_at;
    		delete $scope.admin.updated_at;
    		REST.POST("update-member?_mid="+$scope.admin._id, $scope.admin).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				$location.path('/managers');
    			}

    		});
    	};
    }

]);