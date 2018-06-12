/* ///////////////////////////   ConsoleBox controller app js ///////////////////////////////// */

/********************************** Service description ************************  

********* Angularjs *********

$scope- The scope is the binding part between the HTML (view) and the JavaScript (controller).

$rootScope-  All applications have a $rootScope which is the scope created on the HTML element that contains the ng-app directive.

***************************************** End Service description ***********************/

// initialize app
angular.module('app.controllers', [])

// initialize run
.run(function($rootScope) {
    // pre page loader
    $('#pre-page-loader').delay(200).fadeOut('slow');
})

// initialize controllers
.controller('materialCtrl', ['$scope', function($scope) {

    'use strict';


}]);