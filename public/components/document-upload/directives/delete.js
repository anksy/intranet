'use strict';

angular.module('intranet')
//scroll to top 
.directive('deleteData', ['$timeout','$rootScope','$state','$mdDialog','services', 
	function ($timeout,$rootScope,$state, $mdDialog, services) {
	return {
		scope:{deleteData:'='},
		link:(scope, ele) => {

			
			ele.on('click', () =>{

				$mdDialog.show({
			      controller: "deleteDataController",
			      templateUrl: 'components/document-upload/views/delete-data.html',
			      clickOutsideToClose:false,
			      locals:{ data:scope.deleteData}
			    })
			    .then(function(folder) {
			    }, function(folder) {
			  
			     	if(folder){$timeout( () => {
			     		services.saveLocal('activeFolder', folder);
			     		console.log("added 2 time")
			     		$rootScope.$broadcast('updateList'); 
			     		services.notify(folder.message); 
			     	}, 300);}
			    });
			});

		}
	};
}])


.controller('deleteDataController', 
	['$scope','$mdDialog','services','$rootScope','data','$state',
	($scope,$mdDialog, services , $rootScope,data, $state) => {
	
		$scope.data = data;

		console.log($scope.data);

	$scope.cancel = () => {
      $mdDialog.cancel();
    };



    $scope.delete = () => {


    	
    		$scope.isLoading =true; 
			let request ={
				_id: $rootScope.isLogin._id,
				path:$scope.data.path

			};

    		services.http({ url: window._API_PATH.remove_dir, method:'PUT', data: request})
			.then( res => {
				$scope.isLoading = false;
				 $mdDialog.cancel(res);
			})
			.catch(err => {
				//define error
				$scope.isLoading = false;
				$scope.alert=services.getError(err);
			});
    	
    };
}]);

