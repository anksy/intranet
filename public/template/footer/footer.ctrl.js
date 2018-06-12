 'use strict';
 /*
 footer template
  */
 angular.module('intranet')

     //footer template
     .directive('footer', ['$rootScope', ($rootScope) => {

         return {
             templateUrl: 'template/footer/footer.html',
             link: (scope, ele) => {

             }
         };
     }])
 