'use strict';

app.controller('addEditUserCtrl', ['$timeout', 'toastyService', '$rootScope', 'http', '$scope', '$location', '$routeParams',
	function ($timeout, toastyService, $rootScope, http, $scope, $location, $routeParams) {	

             
	(function(){
			userInfo();

	})();

	function userInfo(){

		if ($routeParams.id) {
			http.get('/admin/user-detail-by-id?id='+$routeParams.id).then(function(response){
				$scope.user = response.result;
			});
		}
	}

	$scope.signUp = function(){		

		http.post('/admin/user-registration', $scope.user).then(function(response){

			toastyService.notification(response.result.success, response.result.message);

			if (response.result.success) {
				$location.path('/admin/users');				
			}
			
		});
	};

	$scope.updateUser = function(){

		http.post('/admin/update-user', $scope.user).then(function(response){
			toastyService.notification(response.result.success, response.result.msg);
			if (response.result.success) {
				$location.path('/admin/users');			
			}
		});

	};

	$scope.placeChanged = function() {
            $scope.place = this.getPlace();
            var address = formatted_address($scope.place.address_components);
            console.log($scope.place);
            $scope.userSignInfo.state = address.state;
            $scope.userSignInfo.subrub = $scope.place.vicinity;
            $scope.userSignInfo.address =   address.address;
            $scope.userSignInfo.zip_code = address.postal_code;
            $scope.userSignInfo.lat = JSON.parse(JSON.stringify($scope.place.geometry.location)).lat;
            $scope.userSignInfo.lng = JSON.parse(JSON.stringify($scope.place.geometry.location)).lng;
            $scope.userSignInfo.coordinates = [$scope.userSignInfo.lng,$scope.userSignInfo.lat];
        };



}]);

function formatted_address(obj){
  if( !angular.isArray(obj) ){
    return obj + ' is not an array';
  }
  var tmp = {};
  if((obj).length > 7){
  	tmp.address = [obj[0].long_name,obj[1].long_name,obj[2].long_name].join(" ");
  }else{
  	tmp.address = [obj[0].long_name,obj[1].long_name].join(" ");
  }
  obj.map(function(x){
    if( x.types.indexOf('locality') > -1 ){
      tmp.city = x.long_name;
    }
    if( x.types.indexOf('administrative_area_level_1') > -1 || x.types.indexOf('administrative_area_level_2') > -1){
      tmp.state = x.long_name;
    }
    if( x.types.indexOf('country') > -1 ){
      tmp.country = x.long_name;
    }
     if( x.types.indexOf('postal_code') > -1 ){
      tmp.postal_code = x.long_name;
    }
  });
  return tmp;
}