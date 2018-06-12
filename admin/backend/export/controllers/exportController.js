'use strict';app.controller('ExportController', ['$mdDialog', '$cookies', '$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','$httpParamSerializer','Top',
    function($mdDialog, $cookies, $timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster,$httpParamSerializer,Top) {
    	
        var pagetypes=['jobs','category', 'payments'];

        if(!$routeParams.id){
            $location.path('/');
        }

        $scope.search = $location.search();
        
        if($routeParams.id){

            var idx=$routeParams.id.toLowerCase();

            if(pagetypes.indexOf(idx)>=0){
                $scope.pageType=idx;
            }
            else{
                 $location.path('/');
            }

        }

        if($location.search().category){
            $scope.query.category = $location.search().category;
        }else{
            delete $scope.query.category;
        }

        if($location.search().appraisalRequest){
            $scope.query.appraisalRequest = $location.search().appraisalRequest;
        }else{
            delete $scope.query.appraisalRequest;
        }


        if($location.search().startDate){
            $scope.query.startDate = $location.search().startDate;
        }else{
            delete $scope.query.startDate;
        }

        if($location.search().endDate){
            $scope.query.endDate = $location.search().endDate;
        }else{
            delete $scope.query.endDate;
        }



        $scope.attrs = function(){
            REST.GET('job-attrs')
            .then(function(response){
                $scope.attr = response.data;
            });
        };

        $scope.attrs();

    	$scope.list = function(){
            console.log($scope.query);
		    REST.GET('list-jobs?'+$httpParamSerializer($scope.query)).then(function(response){
                $scope.data = response.output;
		    	$scope.csv = response.message;
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
                  .title('Would you really want to perform this action on multiple rows?')
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