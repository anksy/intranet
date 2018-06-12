angular.module('intranet')
//scroll to top 
.directive('renameFolder', ['$timeout','$rootScope','$mdDialog','services', 
	function ($timeout,$rootScope,$mdDialog, services) {
	return {
		scope:{folderActive:'='},
		link:(scope, ele) => {

			ele.on('click', (e) => {
				scope.renameFolder(e);
			});

			scope.$watch('folderActive', (folderActive) => {

				if(folderActive){
					scope.folderActive = folderActive;
				}
			});
			
			scope.renameFolder = (ev) => {
				if(!scope.folderActive) { 
					services.notify('Please select folder', 'error'); return; 
				} 

				$mdDialog.show({
			      controller: "renameFolderController",
			      templateUrl: 'components/document-upload/views/rename-folder.html',
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: true,// Only for -xs, -sm breakpoints.
			      locals:{ data:{folderActive:scope.folderActive  }}
			    })
			    .then(function(answer) {
			    }, function(folder) {
			    	if(folder){
			    		services.saveLocal('activeFolder', folder);
			     		$rootScope.$broadcast('updateList'); 
			     		services.notify(folder.message);
			     	} 
			    });
			};
		}
	};
}]);

