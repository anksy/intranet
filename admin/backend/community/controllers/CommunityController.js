'use strict';app.controller('CommunityController', ['$mdDialog', '$cookies', '$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','$httpParamSerializer','Top',
    function($mdDialog, $cookies, $timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster,$httpParamSerializer,Top) {
    	
        /*Type - Pages*/
        $rootScope.query.type = "community";
        $rootScope.query.order = "title";
        
    	$scope.list = function(){
		    REST.GET('list-posts?'+$httpParamSerializer($rootScope.query)).then(function(response){
		    	$scope.data = response.output;
                Top.Scroll();
		    });
    	};

    	$scope.list();

    	$scope.remove = function(_id, ev){
    		var confirm = $mdDialog.confirm()
		          .title('Would you really like to delete this record?')
		          .ariaLabel('Delete Record')
		          .targetEvent(ev)
		          .ok('Yes!')
		          .cancel('No');

		    $mdDialog.show(confirm).then(function() {
		      REST.DELETE("delete-post?post="+_id).then(function(response){
	    			if(response.success){
	    				$scope.list();
	    			}
	    			Toaster.simple(response.message,response.success);
	    		});
		    });
    	};

    	$scope.quickAction = function(type, ev){
    		if(!$scope.selected.length){
    			Toaster.simple("Please choose some records first.", false);
    			return;
    		}

            var confirm = $mdDialog.confirm()
                  .title('Would you really want to perform this action on selected row(s)?')
                  .ariaLabel('Quick Action')
                  .targetEvent(ev)
                  .ok('Yes!')
                  .cancel('No');

            $mdDialog.show(confirm).then(function() {
                REST.POST('quick-post-action',{type:type, on:$scope.selected}).then(function(response){
                    Toaster.simple(response.message, response.success);
                    if(response.success){
                        $scope.list();
                        $rootScope.selected = [];
                    }
                });
            });
    	};
    }

]);