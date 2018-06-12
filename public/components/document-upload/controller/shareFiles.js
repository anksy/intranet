'use strict';

angular.module('intranet')
//scroll to top 
.directive('shareData', ['$timeout','$rootScope','$state','$mdDialog','services', 
	function ($timeout,$rootScope,$state, $mdDialog, services) {
	return {
		link:(scope, ele) => {

			ele.on('click', () =>{
			
				$mdDialog.show({
			      controller: "shareDataController",
			      templateUrl: 'components/document-upload/views/share-data.html',
			      clickOutsideToClose:false,
			       locals:{ data:scope.folderActive }
			    })

			    .then(function(folder) {
			    }, function(folder) {
			  
			     	if(folder){
			     		$timeout( () => {
			     		services.notify(folder.message); 
			     	}, 300);}
			    });
			});

		}
	};
}])

.controller('shareDataController', 
	['$scope','$mdDialog','services','$rootScope','$state','data',
	($scope,$mdDialog, services , $rootScope, $state, data) => {
	$scope.folderActive =data;

	console.log($scope.folderActive);

	$scope.cancel = () => {
      $mdDialog.cancel();
    };


  	$scope.getShareFolder = () => {
  		
  	services.http({
			method:'GET',
			url: window._API_PATH.get_users_of_dir,
			params:{ _id : $rootScope.isLogin._id, folderId: $scope.folderActive._id}
		}).then( res => $scope.users= res.data);

  	};
  	$scope.getShareFolder();
	$scope.users=[];

    $scope.remove = (user) => {
    	
		let index =null;
		 $scope.users.map((res, key) => {
		 	index = user._id==res._id	 ?  key: false;
		 });

		user.isLoading =true;
	   services.http({
			method:'PUT',
			url: window._API_PATH.remove_access,
			data:{ _id : $rootScope.isLogin._id, folderId: $scope.folderActive._id,userId: user._id}
		}).then( res => {
			user.isLoading =false;
			$scope.users.splice(index, 1);
		});

    };


    $scope.searchText = null;
    $scope.selectedUsers = [];
    $scope.transformChip = transformChip;
    $scope.querySearchDeferred = querySearchDeferred;

    $scope.share = (form) => {
    	console.log($scope.selectedUsers);

    	if( $scope.selectedUsers.length>0) {
    		let users=[];
    		users = $scope.selectedUsers.map(r=> r._id);
    		
    		// { path: a/b/c, access: [_id1, _id2, _id3]
    		let params={ 
    			path: $scope.folderActive.path,
    			_id: $rootScope.isLogin._id,
    			access:users
    		}; 

    		services.http({
					method:'PUT',
					url: window._API_PATH.share_resources ,
					data:params
				})
				.then( res => {
					console.log(res);
					$mdDialog.cancel(res);
				}).catch( err => {
					$scope.alert=services.getError(err);
				});
    	}
    };
        
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
    }
 


    function querySearchDeferred(query) {
   	   let params={};
  		params.q= query ? query:'';
		params._id = $rootScope.isLogin._id;
		params.folderId = $scope.folderActive._id;
		params.type='non-shared';
		return services.http({
			method:'GET',
			url:  window._API_PATH.get_users_of_dir ,
			params:params
		})
		.then( res => {
			return res.data; 
		});
		
  }


    
}]);

