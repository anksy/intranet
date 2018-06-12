'use strict';

angular.module('intranet')
.config(['$stateProvider', '$urlRouterProvider', 
	function( $stateProvider, $urlRouterProvider) {
		$stateProvider
        .state({
			name: 'resetPassword',
			url: '/reset-password',
			templateUrl: 'components/app-before-login/app-reset-password/views/reset-password.html',
			controller: 'resetPasswordController'
		});
}]);
