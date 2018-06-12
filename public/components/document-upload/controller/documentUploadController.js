'use strict';
angular.module('intranet')
.controller('documentUploadController', ['$scope','$rootScope','$state','services','$timeout', 
	function($scope, $rootScope,$state,services, $timeout) {
	
		$scope.folderActive=services.getSaveLocal('activeFolder') || {};
		$scope.folders=[];
		$scope.filter =1;
		$scope.searchText =null;
		$scope.params= {limit:150, _id:$rootScope.isLogin._id};

		$scope.getFolderList = (off) => {
			if(!off){	$scope.isLoading = true; } 
			
			services.http({ url: window._API_PATH.getDirs, method:'GET', 
				params: $scope.params})
			.then( res => {
				$scope.isLoading = false;
				$scope.isSearching = false;
				$scope.folders = res.data;
				$scope.folderPath = res.parentDir;
				
				if(!off && $scope.folders.length>0) {
					$scope.folderActive= $scope.folders[0]; 
					services.saveLocal('activeFolder', $scope.folderActive);
				}

				if($scope.folders.length==0){services.deleteSavedLocal('activeFolder');}
			})
			.catch(err => {

				//define error
				$scope.isLoading = false;
				$scope.isSearching = false;
				services.deleteSavedLocal('activeFolder');
				$scope.alert=services.getError(err);

			}).then(() => {  });
		};
		$scope.getFolderList();

		$scope.$on('updateList', (event ,data) => {
			
			if($state.params && !$state.params._id){
				$scope.getFolderList('off');
			}
		});
		 $scope.getShareFolder = (folder) => {
      $scope.isShareLoading= true;
      services.http({
      method:'GET',
      url: window._API_PATH.get_users_of_dir,
      params:{ _id : $rootScope.isLogin._id, folderId: folder._id}
      }).then( res => {$scope.users= res.data ; $scope.isShareLoading= true; });

    };

	
		$scope.folderSelected = (folder) => {
			$scope.folderActive = folder;
				 $scope.getShareFolder(folder);
			services.saveLocal('activeFolder', folder);
		};

		$scope.openFolder = (folder) => {
			if(!folder.attachment){
				$scope.params.q= null;
				$state.go('folderList', { _id:folder._id });
			}
		};

		$scope.clear = () => {
			$scope.searchText =null;
				delete $scope.params.q;
			$scope.getFolderList('off');

		};

		$scope.filterList = (searchText) => {
			$timeout(() => {
			if(searchText){
				$scope.isSearching = true;
				$scope.params.q= searchText; 
				$scope.getFolderList('off');
			}
			else{
				$scope.params.q=null;
				$scope.isSearching = true;
				$scope.getFolderList('off');
			}	
			}, 500);
		};

		$scope.filterResult = (filter) => {

			if(filter==1 || filter==2){
				console.log("filter");
				delete $scope.params.resourceType;
				$scope.getFolderList('off'); 
			}
			else{
				$scope.params.resourceType  = filter;
				$scope.getFolderList('off');
			}
		};



		

}]);
