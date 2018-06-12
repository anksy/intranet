'use strict';
angular.module('intranet')
.controller('folderListController', ['$location', '$scope','$rootScope','$state','services','$timeout', 
	function($location, $scope, $rootScope,$state,services, $timeout) {
		let folderId= null;

		$scope.folderActive=services.getSaveLocal('activeFolder') || {};
		
		$scope.filter =1;
		if(!$state.params && !$state.params._id){
			$state.go("documentUpload");
		}
		
		$scope.params= {
			limit:150, 
			_id:$rootScope.isLogin._id, 
			folderId : $state.params._id
			
		};


		//get folder data and list 
		
		$scope.getFolderList = (off) => {
		
			if(!off){	$scope.isLoading = true; } 
			
			services.http({ url: window._API_PATH.getDirs, method:'GET', 
				params: $scope.params})
			.then( res => {
				$scope.isLoading = false;
				$scope.isSearching = false;
				$scope.folders = res.data;
				$scope.folderPath = res.parentDir;

				$scope.folderActive= $scope.folders[0]; 
				services.saveLocal('activeFolder', $scope.folderActive);

				if($scope.folders.length==0){
					services.deleteSavedLocal('activeFolder');
				}
			})
			.catch(err => {
				//define error
				$scope.isLoading = false;
				$scope.isSearching = false;
				$state.go('error');

			});
		};

		$scope.getFolderList();

		$scope.$on('updateList' , (ev, data) => {
			if($state && $state.params._id){
				$scope.getFolderList('off');
			}
		});  

		$scope.users=[];
		
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

		$scope.clear = () => {
			$scope.searchText =null;
			delete $scope.params.q;
			$scope.getFolderList('off');

		};


}]);
