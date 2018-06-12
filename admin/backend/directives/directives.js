'use strict';
app

.directive('fallbackSrc', function () {

  var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {

      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
      });
    }
   };
   return fallbackSrc;
})

.directive('numbersOnly', function(){
       return {
         require: 'ngModel',
         link: function(scope, element, attrs, modelCtrl) {
           modelCtrl.$parsers.push(function (inputValue) {
               if (inputValue === undefined) return ''; 
               var transformedInput = inputValue.replace(/[^0-9]/g, ''); 
               if (transformedInput!=inputValue) {
                  modelCtrl.$setViewValue(transformedInput);
                  modelCtrl.$render();
               }        

               return transformedInput;         
           });
         }
       };
    })

.directive('setHeight', ['$window', function($window){
    return {
        restrict:'A',
        link: function(scope, element, attrs){
            element.css('min-height', ($window.innerHeight - 50) + 'px');
        }
    };
}])


.directive( 'backButton', function() {
    return {
        restrict: 'A',
        link: function( scope, element, attrs ) {
            element.on( 'click', function () {
                history.back();
                scope.$apply();
            });
        }
    };
})

.directive("materialLoader", function() {
  return {
    restrict: "E",
    template: '<div class="load-container" layout="column" layout-align="center center"><md-progress-circular md-mode="indeterminate"></md-progress-circular></div>'
  };
})

.directive("noRecords", function() {
  return {
    restrict: "E",
    template: '<div class="no-records" layout="column" layout-align="center center"><i class="fa fa-frown-o fa-200x hideGrey"></i></div>'
  };
})

.directive('passwordVerify', passwordVerify);

function passwordVerify() {
  var directive = {
    require: 'ngModel',
    scope: {
      passwordVerify: '='
    },
    link: link
  };

  return directive;

  function link(scope, element, attrs, ngModel) {
    var status = true;
    scope.$watch(function () {
      var combined;
      if (scope.passwordVerify || ngModel) {
        combined = scope.passwordVerify + '_' + ngModel;
      }
      return combined;
    }, function (value) {
      if (value) {
        ngModel.$validators.passwordVerify = function (password) {
          var origin = scope.passwordVerify;
          return (origin === password);
        };
      }
    });
  }
}