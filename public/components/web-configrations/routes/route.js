'use strict';
angular.module('intranet')
.config(['stateHelperProvider', 
	function( stateHelperProvider ) {
		
		stateHelperProvider
        .state({
			name: 'webSettings',
			url: '/settings',
			templateUrl: 'components/web-configrations/views/settings.html',
			controller: 'settingsController',
		})
		
		
}]);
