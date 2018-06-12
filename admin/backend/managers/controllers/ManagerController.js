'use strict';app.controller('ManagerController', ['$mdDialog', '$cookies', '$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','$httpParamSerializer','Top',
    function($mdDialog, $cookies, $timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster,$httpParamSerializer,Top) {
    	

    	$scope.listUsers = function(){
		    REST.GET('list-managers?'+$httpParamSerializer($rootScope.query)).then(function(response){
		    	$scope.data = response.output;
                Top.Scroll();
		    });
    	};

    	$scope.listUsers();
    	$scope.addUser = function(){
    		REST.POST("add-user", $scope.admin).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				$location.path('/managers');
    			}
    		});
    	};

    	$scope.removeUser = function(_id, ev){
    		var confirm = $mdDialog.confirm()
		          .title('Would you really like to delete this user?')
		          .ariaLabel('Remove Admin User')
		          .targetEvent(ev)
		          .ok('Yes!')
		          .cancel('No');

		    $mdDialog.show(confirm).then(function() {
		      REST.DELETE("delete-manager?manager="+_id).then(function(response){
	    			if(response.success){
	    				$scope.listUsers();
	    			}
	    			Toaster.simple(response.message,response.success);
	    		});
		    });
    	};

    	$scope.quickAction = function(type){
    		if(!$scope.selected.length){
    			Toaster.simple("Please choose some records first.", false);
    			return;
    		}
    		REST.POST('quick-action',{type:type, on:$scope.selected}).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				$scope.listUsers();
    			}
    		});
    	};
    }

]);