angular.module('intranet')
//scroll to top 
.directive('addNewFolder', ['$timeout','$rootScope','$mdDialog','services', 
	function ($timeout,$rootScope,$mdDialog,services) {
	return {
		scope:{folders:'=', path:'='},
		link:(scope, ele) => {

			ele.on('click', (e) => {
				scope.addFolder(e);
			});

			scope.$watch('folderActive', (folders) => {
				if(folders){
				scope.folders = folders; 
				}
			});
			
			scope.addFolder = (ev) => {

				$mdDialog.show({
			      controller: "addNewFolderController",
			      templateUrl: 'components/document-upload/views/add-new-folder.html',
			      targetEvent: ev,
			      clickOutsideToClose:true,
			      fullscreen: true,// Only for -xs, -sm breakpoints.
			      locals:{ data:{folders:scope.folders , path: scope.path }}
			    })
			    .then(function(folder) {
			    }, function(folder) {
			  
			     	if(folder){$timeout( () => {
			     		$rootScope.$broadcast('updateList'); 
			     		services.notify(folder.message); 
			     	}, 300);}
			    });
			};
		}
	};
}]);

