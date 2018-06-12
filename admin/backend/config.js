'use strict';
app
    .constant('api_path','/admin_api/');

   if(window.location.host=='localhost:8017'){
      app.constant('socketURL','http://100.100.7.39:8025/');
    }else{
      app.constant('socketURL','http://158.85.75.204:8025/');
    }
    //localstrorage 

    app.config(['localStorageServiceProvider',
        function (localStorageServiceProvider) {
      localStorageServiceProvider
      .setPrefix('TASKYGIG-ADMIN');
    }])

    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(['$q','$rootScope','localStorageService', 
            function($q,$rootScope,localStorageService) {
              return {
               request: function(config) {
                    config.headers = config.headers || {};
                    var token =localStorageService.cookie.get("user");
                    if(token){
                        token=token.token;
                        config.headers.Authorization = 'Bearer ' + token;
                    }
                   return config || $q.when(config);
                },
                response: function(response) {
                   return response || $q.when(response);
                },

                responseError: function(response) {                   
                    if(response.status===401){
                        //distroy session
                         $rootScope.removeSession();
                    }
                    return response || $q.when(response);
                }
              };

        }]);
    }])  

    .config(['$mdThemingProvider',function($mdThemingProvider) {
      $mdThemingProvider.theme('error');
      $mdThemingProvider.theme('success');
    }])
        
    .run(['$rootScope', '$location','$timeout','cfpLoadingBar','$mdDialog','Toaster',
      function($rootScope, $location, $timeout,cfpLoadingBar,$mdDialog,Toaster) {
            $rootScope.isLogin=Toaster.getSession(); 
            
            /*Global Var Declaration*/
            $rootScope.selected = [];
            $rootScope.loader   = false;
            $rootScope.limitOptions = [10, 20, 50];
            $rootScope.query = {
               order: '_id',
               limit: 10,
               page: 1
            };

            $rootScope.$on('$routeChangeSuccess', function(event, next, current) {
              
              $rootScope.selected = [];
              $rootScope.q='';
              delete $rootScope.query.type;

              if(!$rootScope.checkRole(next.$$route.accessLevel)){
                $location.path('/');
               }

                var noHeader = ['/login','/reset-password'];

                if(noHeader.indexOf($location.path())>=0) {
                    $rootScope.headerAndSidebar = false;
                } else {
                    $rootScope.headerAndSidebar = true;
                }

                cfpLoadingBar.start();        
                $timeout(function(){
                  cfpLoadingBar.complete();
                },2000);

                $('html,body').animate({
                  scrollTop: 0
                },500);
            });

            $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {
                if (rejection.authentication === true) {
                    $location.path('/dashboard');
                } else {
                    $location.path('/login');
                }
            });

            $rootScope.$on('$locationChangeSuccess', function(event, current, previous) { 
                var previousUrl = previous.substr(0, previous.indexOf('?'));
                var currentUrl = current.substr(0, current.indexOf('?'));
                if (previousUrl !== currentUrl && previousUrl.length > 0) {
                    $location.search('');
                }
            });

            $rootScope.$on('$routeChangeStart', function() {
                if ($location.path() == '/login') {
                    $rootScope.adminLoginPage = true;
                } else {
                    $rootScope.adminLoginPage = false;
                }
            });

            $rootScope.go = function(link){
                if(link.indexOf("?")>=0){
                  var Qurl = link.split("?");
                  var QS = Qurl[1].split("=");
                  $location.path(Qurl[0]).search(QS[0],QS[1]);
                }else{
                  $location.path(link);
                }
                
            };

            $rootScope.closeDialog = function(){
                $mdDialog.hide();
            };

            $rootScope.logout = function(ev){
              
                Toaster.confirm({
                    title:'Do you really want to logout?',
                    message:'You can ternimate your session',
                    event:ev?ev:''
                })
                .then(function(){
                  $rootScope.removeSession();
                 }, function(){

                });

            };

          $rootScope.removeSession = function(){
            localStorage.removeItem("token"); //remove token 
            Toaster.removeSession(); //remove cookies data
            delete $rootScope.isLogin; //delete rootscope data
            $location.path('/login'); //redirect to login page 
          };
        
          //check user role 
          $rootScope.checkRole = function(obj){
              if(!obj){
                return true;
              }
              var checkInfo={};
                  checkInfo.userRole=$rootScope.isLogin.user.type; //check local session 
                  checkInfo.status=false; //set default false

              if(obj){ //check if exist
                angular.forEach(obj, function(value){
                  
                  if(obj.indexOf(checkInfo.userRole)>=0){
                    checkInfo.status=true;
                  }

                });
              }
              return checkInfo.status;
          };
    }]);