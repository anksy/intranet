/* ///////////////////////////   ConsoleBox frontend app js ///////////////////////////////// */


/********************************** Module description ************************  

ngMaterial- Angular Material
ngAnimate- Angularjs Animation
ngAria-  Angularjs ARIA attributes
ngMessages- Angularjs ngMessages(The ngMessages module provides enhanced support for displaying messages within templates).
ngRoute- Angularjs Routing
ui.router- Third party routing module
ui.router.state.events- Detect tui routing state

***************************************** End Module description ***********************/


/********************************** Service description ************************  

$mdThemingProvider- Theme provider in ngMaterial
$stateProvider- State provider in ui.router
$urlRouterProvider-  url router provider in ngRoute

***************************************** End Service description ***********************/

// initialize app
angular.module('materialApp', ['app.controllers', 'ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'ngRoute', 'ui.router', 'ui.router.state.events'])

// initialize configuration
.config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', function($mdThemingProvider, $stateProvider, $urlRouterProvider) {

    'use strict';

    // configure theme, default indigo 
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            'default': '600', // by default use shade 600 from the indigo palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '300', // use shade 300 for the <code>md-hue-2</code> class
            'hue-3': '500' // use shade 500 for the <code>md-hue-3</code> class
        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('grey', {
            'default': '500' // use shade 500 for default, and keep all other shades the same
        })
        .backgroundPalette('grey', {
            'default': '200' // use shade 200 for default, and keep all other shades the same
        });
    // Mobile browsers status bar color
    $mdThemingProvider.enableBrowserColor({
        theme: 'defualt',
        palette: 'indigo', // Note this, you have to use a predefined palette name
        hue: '400'
    });

    // custom color define
    $mdThemingProvider.theme('dark-indigo').backgroundPalette('indigo').dark();

    // configure routing
    $stateProvider
        .state('/', {
            url: "/signup",
            templateUrl: 'signup.html',
            resolve: {
                themeMeta: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
                    var title = "signup",
                        description = "signup";
                    $rootScope.themeMeta = { title: title, description: description };
                }]
            }
        }).state('login', {
            url: "/login",
            templateUrl: 'login.html',
            resolve: {
                themeMeta: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
                    var title = "login",
                        description = "login";
                    $rootScope.themeMeta = { title: title, description: description };
                }]
            }
        }).state('reset', {
            url: "/reset",
            templateUrl: 'reset.html',
            resolve: {
                themeMeta: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
                    var title = "reset",
                        description = "reset";
                    $rootScope.themeMeta = { title: title, description: description };
                }]
            }
        }).state('lock', {
            url: "/lock",
            templateUrl: 'lock.html',
            resolve: {
                themeMeta: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
                    var title = "lock",
                        description = "lock";
                    $rootScope.themeMeta = { title: title, description: description };
                }]
            }
        }).state('change-password', {
            url: "/change-password",
            templateUrl: 'change-password.html',
            resolve: {
                themeMeta: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
                    var title = "change password",
                        description = "change password";
                    $rootScope.themeMeta = { title: title, description: description };
                }]
            }
        }).state('contactus', {
            url: "/contactus",
            templateUrl: 'contactus.html',
            resolve: {
                themeMeta: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
                    var title = "contactus",
                        description = "contactus";
                    $rootScope.themeMeta = { title: title, description: description };
                }]
            }
        }).state('404', {
            url: "/404",
            templateUrl: '404.html',
            resolve: {
                themeMeta: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
                    var title = "404",
                        description = "404";
                    $rootScope.themeMeta = { title: title, description: description };
                }]
            }
        }).state('500', {
            url: "/500",
            templateUrl: '500.html',
            resolve: {
                themeMeta: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
                    var title = "500",
                        description = "500";
                    $rootScope.themeMeta = { title: title, description: description };
                }]
            }
        }).state('home', {
            url: "/home",
            templateUrl: 'home.html',
            resolve: {
                themeMeta: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
                    var title = "home",
                        description = "home";
                    $rootScope.themeMeta = { title: title, description: description };
                }]
            }
        });
    $urlRouterProvider.otherwise('/home');
}]);