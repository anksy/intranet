'use strict';app.controller('JobsController', ['$mdDialog', '$cookies', '$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','$httpParamSerializer','Top',
    function($mdDialog, $cookies, $timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster,$httpParamSerializer,Top) {
    	
        /*Type - Pages*/
      //  $rootScope.query.order = "title";

    	$scope.listJobs = function(){
		    REST.GET('listing-jobs?'+$httpParamSerializer($rootScope.query)).then(function(response){
		    	$scope.data = response.output;
                Top.Scroll();
		    });
    	};

    	$scope.listJobs();

        $scope.resetPage = function(){
            $rootScope.query.page=1;
        };

        $scope.getAJob = function(){
            REST.GET('get-single-job?_id='+$routeParams.id)
            .then(function(response){
                $scope.job = response.output;
            });
        };

    	$scope.cancelJob = function(_id, ev){
    		var confirm = $mdDialog.confirm()
		          .title('Would you really like to cancel this contract?')
		          .ariaLabel('cancel Record')
		          .targetEvent(ev)
		          .ok('Yes!')
		          .cancel('No');

		    $mdDialog.show(confirm).then(function() {
		      REST.POST("cancel-job?_id="+_id).then(function(response){
	    			if(response.success){
	    				$scope.getAJob();
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
                        $scope.listJobs();
                        $rootScope.selected = [];
                    }
                });
            });
    	};

        if($routeParams.id) $scope.getAJob();
    }

]);