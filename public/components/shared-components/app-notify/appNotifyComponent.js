'use strict';
//notification alert toast
angular.module('intranet')
.controller('notifyCtrl', ['$scope', '$mdToast', 'message', '$state', '$rootScope', 
	function ($scope, $mdToast, message, $state, $rootScope) {
	$scope.message = message;
	$scope.close = function () {
		$mdToast.hide();
	};

	$scope.redirect = function () {
		if (!message.data) return;
		if ($scope.message.data.type === "posted") {
			$mdToast.hide();
		}
	};
}]);
