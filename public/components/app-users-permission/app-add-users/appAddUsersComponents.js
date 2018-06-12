'use strict';
angular.module('intranet')
.controller('addUsersController', ['$scope','$rootScope','$state','services','$timeout', 
	function($scope, $rootScope,$state,services, $timeout) {
	let request = {
			url: window._API_PATH.addEmployee,
			method:'POST',
			data: {_id:$rootScope.isLogin._id}
		};

	$scope.state =$state.current.name;
	$scope.user={ permissions :[] };

	$scope.userPermissionList =[
		'Full Functional Email',
		'Employee Invoicing automation',
		'Customer CRM for employee use',
		'Customer list view'
	];
	$scope.isEdit =false;
	//get user list 
	
	if($state.current.name==='updateUser') {
		$scope.isPageLoading =true;
		//update request params
		request.url = window._API_PATH.updateEmployee //update URL
		request.method ="PUT";
		request.data.userId = $state.params.id;

		if(!$state.params.id){ return; }
		$scope.isEdit =true;
		services.http({
				method:'GET',
				url: window._API_PATH.getEmployee,
				params:{userId: $state.params.id,_id:$rootScope.isLogin._id}
			}).then( res => {
				$scope.user= res.data ;
				$timeout(() => { $scope.isPageLoading =false;}, 300);
				

			}).catch(err => {
				$timeout(() => { $scope.isPageLoading =false;}, 300);
				history.go(-1);
				services.notify(services.getError(err).message , 'error');
			});
	}


	$scope.submitForm = (form) => {
		if(form.$valid){

			if($scope.user.permissions.length ===0){
				$scope.alert={type:'error', message:'Please select at least one user permission'};
				return;
			}

			request.data.userData =$scope.user;

			$scope.isLoading = true;
			services.http(request)
			.then( res => {
				$scope.isLoading = false;
				
				$scope.alert={type:'success', message:res.message + ' <a href="/user-list">view  list</a>'};
					console.log($scope.isEdit);

				if($scope.isEdit ==false){
					$scope.user={ permissions :[] };
					form.$setPristine();
					form.$setUntouched();
				}
			})
			.catch(err => {
				//define error
				$scope.isLoading = false;
				$scope.alert=services.getError(err);
			});
		}
	};

	$scope.generatePassword = () =>{
		$scope.user.password = randomPassword(8);
	};

	$scope.toggle = function (item, list) {
	    var idx = list.indexOf(item);
	    if (idx > -1) {
	      list.splice(idx, 1);
	    }
	    else {
	      list.push(item);
	    }
  	};

	$scope.exists = function (item, list) {
		if(list){
    		return list.indexOf(item) > -1;
    	}
  	};


}]);

