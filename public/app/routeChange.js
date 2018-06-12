'use strict';
angular.module('intranet')
.run(['$rootScope','$state','$timeout','$location', function ($rootScope,$state,$timeout,$location) {
$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        $rootScope.isLoginRoute = toState.name==='login' || toState.name==='resetPassword' ? true : false;
    
});
    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
        $rootScope.isLoginRoute = toState.name==='login' || toState.name==='resetPassword' ? true : false;
        
        $rootScope.state=toState.name;
        
        if($rootScope.isLogin){
            if(Object.keys($rootScope.isLogin).length ==0){
            if(toState.auth){
                if(toState.auth.login ===true){
                    console.log("login1");
                  $location.path('/login');  
                }
            } 
            }else{
                if(toState.name==='login'){
                    console.log("login2");
                  $state.go('dashbaord'); 
                }

            }
        }else{
            console.log("login3");
            $location.path('/login'); 
        }
        
    });

 }]);