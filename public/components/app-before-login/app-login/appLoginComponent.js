'use strict';
angular.module('intranet')
.controller('loginController', ['$scope','$rootScope','services','$state', 
	function($scope, $rootScope, services,$state) {

		$scope.user= services.getSession().session || {};
		
		let tempLogin = () =>{
			let user = {
				email:"mahendra.life@hotmaul.com",
				name:"mahendra"
			};
			$rootScope.isLogin = services.setSession(user).user;
			$rootScope.isCookies = services.setSession(user).session;
			$state.go('dashbaord');
		};

		$scope.submitForm = (form, user) => {

			//tempLogin();
			if(form.$valid) {
				$scope.alert={type:'success',message:'Processing..'};
				$scope.isLoading = true;
			
				services.http({
					method:'POST',
					url: window._API_PATH.login,
					data: user
				})
				.then( res => {
					$scope.isLoading = false;

					res.data.remember =user.remember;
					$rootScope.isLogin = services.setSession(res.data).user;
					$rootScope.isCookies = services.setSession(res.data).session;
					
					$state.go('dashbaord');
					$scope.alert={type:'success',message:res.message};
				})
				.catch(err => {
					//define error
					$scope.isLoading = false;
					$scope.alert=services.getError(err);
				});
			}
		};


		$scope.loginDifferent = () => delete $rootScope.isCookies;
		$scope.removeSession = () => $rootScope.isCookies = services.removeCookies();


	
}]);

