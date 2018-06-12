'use strict';

app.controller('userController', ['toastyService', 'confirmationDialog', '$rootScope','defaultSortType', 'sortIcon', 'http', '$scope', '$location', '$routeParams', 'paging',
	function (toastyService, confirmationDialog, $rootScope, defaultSortType, sortIcon, http, $scope, $location, $routeParams, paging) {	

             
	(function(){

		/*delay this 10 milisecond to get fresh routeParams */
		setTimeout(function(){
		    var page = $routeParams.page ? $routeParams.page : 1; 
		    $scope.paging = {page: page};		
		    userList();
		}, 10);				    

        $scope.forceEllipses = paging.forceEllipses;

        /*set max size in pagination*/
        $scope.maxSize = paging.maxSize;

        /*define page heading (customer or service provider)*/
		pageHeading();	

	})();

	function pageHeading() {

		var locationArray = $location.path().split('/');
		$scope.lastIndex = locationArray[locationArray.length-1];

		if ($scope.lastIndex == 'service-providers') {

			$scope.userType = "Service Provider";

		} else if ($scope.lastIndex == 'customers') {

			$scope.userType = "Customer";
			
		}

	}

	$scope.redirectTo = function(url, id){
		$location.path(url+id);
	};

	/*get users list and show on page*/
	function userList (sort, type) {

		var sortBy;
		if (sort) {
			sortBy = sort;
		} else {
			sortBy = "created_at";			
			type = defaultSortType;		
		}

		var page = angular.isDefined($scope.paging) ? $scope.paging.page : 1;	

		http.get('/admin/user-list?type='+$scope.lastIndex+"&page="+page+"&sortBy="+sortBy+"&sortType="+type).then(function(response){
			
			$scope.data = response;
			$scope.paging = response.paging;

		});

	}

	/*set page number in url*/
	function setPageNumberInUrl (n) {

		var page = angular.isDefined(n) ? n : $scope.paging.page;
		
		$location.search("page", page);

	} 

	/*filter user list*/
	$scope.search = function(getmore) {

		if (angular.isUndefined($scope.searchFor)) {	

			$scope.paging = {page:1};
			setPageNumberInUrl();	

			userList();			

		}else{

			/*set default page number*/
			if (getmore !== 'getmore') {
				$scope.paging = {page:1};
				setPageNumberInUrl();
			}

			/*check if page is defined ot not*/
			var page = angular.isDefined($scope.paging) ? $scope.paging.page : 1;
			
			/*fetch users according to user keywords*/
			http.get('/admin/search-user?user='+$scope.lastIndex+"&page="+page+"&search="+$scope.searchFor).then(function(response){
				$scope.data = response;
				$scope.paging = response.paging;
			});	



		}

	};

	/*show next result using*/
    $scope.getMoreRecord = function(){    

    	if (angular.isDefined($scope.searchFor)) {

    		$scope.search('getmore');

    	}else{

    		userList(); 

    	}  

    	setPageNumberInUrl();                   
    	
    };	


	$scope.addNew = function(url){
		$location.path(url);
	};

	$scope.signUp = function(){

	};

	$scope.sort = function(search, sortOn, event){

		 var type;
		 var as_ds = sortIcon.set(event);  
         	type = as_ds === 1 ? 1 : -1;

         if (sortOn == 'status') {
         	type = type*-1;
         } 

         userList(sortOn, type);

	};

	$scope.trash = function(id, index, event){
	
		confirmationDialog.confirm(event, function(result){
			result.then(function(){
				http.post('/admin/temp-remove-user/'+id).then(function(response){
					toastyService.notification(response.result.success, response.result.msg);
					if (response.result.success) {
						$scope.data.result.splice(index, 1);
					}
				});	
			}, function(){
			});
		});

	};

}]);