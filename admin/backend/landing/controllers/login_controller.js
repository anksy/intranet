'use strict';

app.controller('authController', ['$scope','$location', 'REST','Toaster',"$routeParams",'$rootScope',
 function($scope, $location, REST, Toaster, $routeParams,$rootScope){
 		$scope.form = 1;
 		$scope.login = {remember:false,expires:40};

 	  if(Toaster.getUserSession()){
 			$scope.login=Toaster.getUserSession();
 		}

		$scope.adminLogin = function(){	
			$scope.isLoading=true;
			REST._LOGIN('login', $scope.login).then(function(response){	 
				
				$scope.isLoading=false;
			 	if(response.success){
			 		
			 		$location.path('/dashboard');

			 		if($scope.login.remember){
						response.expires=$scope.login.expires;	
					}

			 	    $rootScope.isLogin=Toaster.setSession(response);
			 	    Toaster.saveUserSession($scope.login);

			 		

			 	}else{
			 		Toaster.simple(response.message,false);
			 	}
			});
	  	};	

	  	$scope.forgotPassword = function(){
	  		REST.POST('forgot', $scope.forgot).then(function(response){	 	
				$scope.forgot = null;
				$scope.forgotForm.$setPristine();
				$scope.forgotForm.$setUntouched();
			 	Toaster.simple(response.message,response.success);
			});
	  	};

	  	if(!$routeParams.reset)
	  			$scope.nokey = true;

	  	$scope.resetPassword = function(){
	  		$scope.reset.key = $routeParams.reset;
	  		REST.POST('reset', $scope.reset).then(function(response){	 	
			 	Toaster.simple(response.message,response.success);
			 	if(response.success)
			 		$location.path('/login');
			});
	  	}; 

	  	/*functions for Controller*/

	  	
	  	function remember(type){
	  		if(type==='add')
	  			localStorage.setItem("remember",JSON.stringify($scope.login));
	  		else
	  			localStorage.removeItem("remember");
	  	}
}]);