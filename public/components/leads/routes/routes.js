'use strict';
angular.module('intranet')
.config(['stateHelperProvider', 
	function( stateHelperProvider ) {
		stateHelperProvider
        .state({
			name: 'allLeads',
			url: '/leads',
			templateUrl: 'components/leads/views/list.html',
			controller: 'leadsController',
		})
		.state({
			name: 'addLead',
			url: '/leads/add',
			templateUrl: 'components/leads/views/add.html',
			controller: 'addLeadsController',
		})
		.state({
			name: 'editLead',
			url: '/leads/edit/:id',
			templateUrl: 'components/leads/views/add.html',
			controller: 'addLeadsController',
		})
}]);
