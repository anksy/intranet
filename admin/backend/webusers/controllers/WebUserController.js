'use strict';app.controller('WebUserController', ['$mdDialog', '$cookies', '$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','$httpParamSerializer','Top','socket',
    function($mdDialog, $cookies, $timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster,$httpParamSerializer,Top,socket) {
		/*Type - Pages*/
        $rootScope.query.type = ["company","individual"];
        $rootScope.query.order = "_id";

        if($routeParams.type){
            $rootScope.query.type = $routeParams.type;
        }else{
            $rootScope.query.type = '';
        }

        socket.emit('admin.blocked', {userId:["1","2"]}, function(response){
            console.log(response);
        });
        
    	$scope.list = function(){
            if(!$rootScope.query.type){
                $rootScope.query.type = ["company","individual"];
            }
		    REST.GET('list-users?'+$httpParamSerializer($rootScope.query)).then(function(response){
		    	$scope.data = response.output;
                Top.Scroll();
		    });
    	};	    	

    	$scope.list();

    	$scope.quickAction = function(type, ev){
            console.log($scope.selected);
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

        $scope.addUser = function(){
            REST.POST("add-web-user", $scope.user).then(function(response){
                Toaster.simple(response.message, response.success);
                if(response.success){
                    $scope.user = {};
                    $scope.userForm.$setPristine();
                    $scope.userForm.$setUntouched();
                }
            });
        };

        $scope.updateUser = function(){
            var action = 'active';

            console.log($scope.user.status, typeof $scope.user.status);
            if(!$scope.user.status || $scope.user.status=='false' || $scope.user.status==false){
                action = 'inactive';
            }
            $scope.selected.push($scope.user._id);
            REST.POST('quick-user-action',{type:action, on:$scope.selected}).then(function(response){
                Toaster.simple(response.message, response.success);
                if(response.success){   
                    socket.emit('admin.blocked', {userId:$scope.selected}, function(response){
                        
                    });
                    $rootScope.selected = [];
                }
            });
        };

        if($routeParams.id){
            REST.GET('get-user?_id='+$routeParams.id)
            .then(function(response){
                $scope.user = response.output;
            });
        }
    }

]);