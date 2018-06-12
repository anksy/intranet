'use strict';
app.factory('REST', ['$http', 'api_path','$rootScope', function ($http, api_path, $rootScope) {
	return {
		GET: function(url, data){
			$rootScope.loader = true;
			return $http.get(api_path+url, data).then(function(response){
				$rootScope.loader = false;
				return response.data;
			});				
		},
		POST: function(url, data){
			$rootScope.loader = true;
			return $http.post(api_path+url, data).then(function(response){
				$rootScope.loader = false;
				return {
					statusCode: response.status,
					output : response.data.output,
					message: response.data.message,
					success: response.data.success
				};
			}, function(response){
				$rootScope.loader = false;
				return {
					error: response.data
				};
			});
		},
		PUT: function(url, data){
			$rootScope.loader = true;
			return $http.put(api_path+url, data).then(function(response){
				$rootScope.loader = false;
				return {
					statusCode: response.status,
					output : response.data.output,
					message: response.data.message,
					success: response.data.success
				};
			}, function(response){
				$rootScope.loader = false;
				return {
					error: response.data
				};
			});
		},
		DELETE: function(url){
			$rootScope.loader = true;
			return $http.delete(api_path+url).then(function(response){
				$rootScope.loader = false;
				return {
					statusCode: response.status,
					output : response.data.output,
					message: response.data.message,
					success: response.data.success
				};
			});			
		},
		_LOGIN: function(url, data){
			$rootScope.loader = true;
			return $http.post(api_path+url, data).then(function(response){
				$rootScope.loader = false;
				return {
					success: response.data.success, 
					message: response.data.message, 
					token: response.data.token,
					user: response.data.user
				};
			}, function(response){
				$rootScope.loader = false;
				return {
					message: response.data.errors
				};
			});
		}
	};
}]);