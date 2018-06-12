'use strict';
angular.module('intranet')
.config(['$stateProvider', 'stateHelperProvider', 
	function( $stateProvider,stateHelperProvider) {
		// stateHelperProvider
  //       .state({
		// 	name: 'usersPermission',
		// 	templateUrl: 'components/app-users-permission/views/userPermission.html',
		// 	controller: 'usersPermissionController',
		// 	children:[
		// 	{
		// 		name: 'viewsUsers',
		// 		url: '^/users-list',
		// 		templateUrl: 'components/app-users-permission/app-view-users/views/user-list.html',
		// 		controller: 'usersListController',
		// 	},{
		// 		name: 'addUsers',
		// 		url: '^/add-new-users',
		// 		templateUrl: 'components/app-my-profile/app-change-password/views/change-password.html',
		// 		controller: 'addUsersController',
		// 	}
		// ]
		
		// });
	
		stateHelperProvider
		 .state({
		 	url: '/user-list',
			name: 'viewsUsers',
			templateUrl: 'components/app-users-permission/app-view-users/views/user-list.html',
			controller: 'usersListCtrl'
		});

		 stateHelperProvider
		 .state({
		 	url: '/add-new-user',
			name: 'Adduser',
			templateUrl: 'components/app-users-permission/app-add-users/views/add-user.html',
			controller: 'addUsersController'
		});

		 stateHelperProvider
		 .state({
		 	url: '/update-user/:id',
			name: 'updateUser',
			params:{id:null},
			templateUrl: 'components/app-users-permission/app-add-users/views/add-user.html',
			controller: 'addUsersController'
		});


}]);
