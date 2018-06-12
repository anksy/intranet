'use strict';
angular.module('intranet')
.config(['$stateProvider', '$urlRouterProvider','$locationProvider', 
	function( $stateProvider, $urlRouterProvider, $locationProvider) {

	$stateProvider
    .state({
        name: 'dashbaord',
        url: '/',
        templateUrl: 'components/app-dashboard/views/dashboard.html',
        controller: 'dashbaordController',
        auth:{login:true}
    })
    .state({
		name: 'error',
		templateUrl: 'components/error/no-access.html',
	});
    
     $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

	$urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise(function ($injector, $location) {
        var state = $injector.get('$state');
        state.go('error');
        return $location.path();
    });


}]);
