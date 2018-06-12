'use strict';

angular.module('intranet')
.config(['stateHelperProvider', 
	function( stateHelperProvider) {
		stateHelperProvider
        .state({
			name: 'login',
			url: '/login',
			templateUrl: 'components/app-before-login/app-login/views/login.html',
			controller: 'loginController',
			// resolve: {checkLogin :['loginValidate', (loginValidate) => {
			// 	return loginValidate.checkStatus();
			// }]}
		});
}]);
