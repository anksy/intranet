'use strict';app.controller('AddLinkController', ['$scope', '$rootScope', '$location', 'REST','Toaster',
    function($scope, $rootScope, $location, REST, Toaster) {

        /*Set Type*/
        $scope.cms = {type:"link"};
        /*Type - Pages*/
    	$scope.add = function(){
    		REST.POST("add-post", $scope.cms).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				$location.path('/links');
    			}
    		});
    	};
    }

]);