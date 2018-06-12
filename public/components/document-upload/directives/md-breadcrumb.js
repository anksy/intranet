'use strict';

angular.module('intranet')
//scroll to top 
.directive('mdBreadcrumb', ['$timeout','$rootScope','$state', 
	function ($timeout,$rootScope,$state) {
	return {
		templateUrl:'components/document-upload/views/md-breadcrumb.html',
		scope:{data:'='},
		link:(scope, ele) => {

			scope.state = $rootScope.state;
			scope.$watch('data', (breadcrumb) => {
				if(breadcrumb && breadcrumb.breadcrumb){
					scope.breadcrumb = breadcrumb.breadcrumb;
						scope.breadcrumb.push({_id:breadcrumb._id , title: breadcrumb.title });
				}
			});

			scope.goTo = (link) => {
			 	$state.go('folderList', {_id:link._id });
			};
		}
	};
}]);

