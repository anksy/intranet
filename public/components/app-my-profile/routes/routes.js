'use strict';
angular.module('intranet')
.config(['$stateProvider', 'stateHelperProvider', 
	function( $stateProvider,stateHelperProvider) {
		stateHelperProvider
        .state({
			name: 'myProfile',
			url: '/my-profile',
			templateUrl: 'components/app-my-profile/views/my-profile.html',
			controller: 'myProfileController',
			children:[
			{
				name: 'personalInfo',
				url: '/personal-information',
				templateUrl: 'components/app-my-profile/app-personal-info/views/personal-info.html',
				controller: 'personalInfoController',
			},{
				name: 'changePassword',
				url: '/change-password',
				templateUrl: 'components/app-my-profile/app-change-password/views/change-password.html',
				controller: 'changePasswordController',
			},{
				name: 'changePicture',
				url: '/change-picture',
				templateUrl: 'components/app-my-profile/app-change-picture/views/update-picture.html',
				controller: 'changePictureController',
			}
		]
		
		});
}]);
