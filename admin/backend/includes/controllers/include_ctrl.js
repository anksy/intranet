'use strict';app.controller('includeController', ['$mdDialog', '$cookies', '$timeout',  'Upload', '$routeParams', '$scope', '$rootScope', '$location', 'REST',
    function($mdDialog, $cookies, $timeout, Upload, $routeParams, $scope, $rootScope, $location, REST) {

        (function() {
            if (angular.isUndefined($cookies.get('clickedOn'))) {
                $cookies.put('clickedOn', '.dashboard');
            }
            
            $timeout(function() {
                angular.element(document.querySelector($cookies.get('clickedOn'))).addClass('active');
                angular.element(document.querySelector($cookies.get('subMenu'))).addClass('active');
            }, 500);

        }());

        $scope.selectMainMenu = function(event) {
            var array = event.currentTarget.className.split(' ');
            var clickedOn = '.' + array[1];
            if (array.indexOf('active') == -1) {
                $cookies.put('clickedOn', clickedOn);
                $('.treeview').removeClass('active');
                $timeout(function() {
                    $(clickedOn).addClass('active');
                }, 500);
            }
        };

        $scope.selectSubmenu = function($event) {
            var array = $event.currentTarget.className.split(' ');
            var clickedOn = '.' + array[0];
            $('.treeview-menu li').removeClass('active');
            $cookies.put('subMenu', clickedOn);
            $(clickedOn).addClass('active'); 
        };

        $scope.hideSubmenu = function() {
            $(".treeview-menu").slideUp("slow");
        };

        $scope.profilePage = function() {
            $location.path('/admin/profile');
        };

        $scope.changePasswordPage = function() {
            $location.path('/admin/change-password');
        };

        /*function getCount () {
            if ($location.path() == '/admin/login' || $location.path() == '/') {
            }else{
                http.get('/admin/get-all-count').then(function(response){
                    var data = response.result;
                    for(var k in data){
                        $scope[k] = data[k];
                    }                
                });                
            }
        }*/

        $scope.comingSoon = function(ev){
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Module is under development')
                .textContent('')
                .ariaLabel('Alert Dialog Demo')
                .ok('Ok')
                .targetEvent(ev)
            );
        };

    }
]);