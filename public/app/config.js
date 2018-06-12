'use strict';
// initialize app

angular.module('intranet', [
	'ngMaterial', 
	'ngAnimate', 
	'ngAria', 
	'ngMessages', 
	'ui.router',
	'ui.router.stateHelper' ,
    'md.data.table',
	'ngImgCrop',
	'LocalStorageModule',
	'ngFileUpload',
	'googlechart',
	'ngSanitize',
    'ui.bootstrap'
])

.config(['localStorageServiceProvider','$qProvider', function (localStorageServiceProvider,$qProvider) {
  localStorageServiceProvider
    .setPrefix(window._env.prefix);

    // $qProvider.errorOnUnhandledRejections(false);
}])

//http headers and httpProvider , cookies 
.config(['$httpProvider', function ($httpProvider) {
    var interceptor = ['$q', '$rootScope', function ($q, $rootScope) {
        return {
            request: function request(config) {
                var googleURL = config.url;

                if ($rootScope.isLogin && config.data) {
                    config.data._id = $rootScope.isLogin._id;
                }

                if (googleURL.indexOf('maps.googleapis.com') > -1) {
                    return config;
                }

                var token =  $rootScope.getToken();
                config.headers = config.headers || {};
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                
                return config || $q.when(config);
            },
            requestError: function requestError(rejection) {
                return $q.reject(rejection);
            },
            response: function response(_response) {
                return _response || $q.when(_response);
            },

            //Revoke client authentication if 400 is received
            responseError: function responseError(rejection) {

                if (rejection.status === 417) {
                    $rootScope.logOut();
                }
                
                return $q.reject(rejection);
            }
        };
    }];

    $httpProvider.interceptors.push(interceptor);
}]);