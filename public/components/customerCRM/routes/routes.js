'use strict';
angular.module('intranet')
.config(['stateHelperProvider', 
	function( stateHelperProvider ) {
		stateHelperProvider
        .state({
			name: 'customerCRM',
			url: '/customer-list',
			templateUrl: 'components/customerCRM/views/customerList.html',
			controller: 'customerCRMController',
		})
		.state({
			name: 'addCustomer',
			url: '/add-customer',
			templateUrl: 'components/customerCRM/views/addCustomer.html',
			controller: 'addCustomerController',
		})
		.state({
			name: 'editCustomer',
			url: '/update-customer/:id',
			templateUrl: 'components/customerCRM/views/addCustomer.html',
			controller: 'updateCustomerController',
		});
}]);
