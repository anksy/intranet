'use strict';app.controller('AppUserController', ['$mdDialog', '$cookies', '$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','$httpParamSerializer','Top','socket',
    function($mdDialog, $cookies, $timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster,$httpParamSerializer,Top,socket) {
		/*Type - App Users*/
        $rootScope.query.type = ["appraiser","inspector","trainee","apprentice"];
        $rootScope.query.order = "_id";

        if($routeParams.type){
            $rootScope.query.type = $routeParams.type;
        }else{
            $rootScope.query.type = '';
        }
        
    	$scope.list = function(){
            if(!$rootScope.query.type){
                $rootScope.query.type = ["appraiser","inspector","trainee","apprentice"];
            }
		    REST.GET('list-users?'+$httpParamSerializer($rootScope.query)).then(function(response){
		    	$scope.data = response.output;
                Top.Scroll();
		    });
    	};	    	

    	$scope.list();

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
                REST.POST('quick-user-action',{type:type, on:$scope.selected}).then(function(response){
                    Toaster.simple(response.message, response.success);
                    if(response.success){
                        $scope.list();
                      
                        socket.emit('admin.blocked', {userId:$scope.selected}, function(response){
                            console.log(response);
                        });
                        $rootScope.selected = [];

                    }
                });
            });
    	};
    }

]);