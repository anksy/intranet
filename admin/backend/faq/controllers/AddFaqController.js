'use strict';app.controller('AddFaqController', ['$scope', '$rootScope', '$location', 'REST','Toaster','api_path','Upload',
    function($scope, $rootScope, $location, REST, Toaster, api_path, Upload) {
        /*Set Type*/
        $scope.cms = {type:"faq"};
        /*Type - Pages*/
    	$scope.add = function(){
    		REST.POST("add-post", $scope.cms).then(function(response){
    			Toaster.simple(response.message, response.success);
    			if(response.success){
    				$location.path('/faq');
    			}
    		});
    	};
    }
]);