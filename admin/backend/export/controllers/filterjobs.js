'use strict';app
.directive('jobFilter', function(){
	return {
		templateUrl:'backend/export/template/jobsFilter.html',
		controller:'filterJob'
	};
})
//filter controller
.controller('filterJob', ['$scope','$location', function($scope,$location){

	$scope.searchResult = function(form, data){

		if(data){
			$location.search(data);
		}
	};
	

}]);