'use strict';

app
.directive('ascIcon', ['$compile', function ($compile) {
	
	return {

		restrict: "A",

		link: function(scope, element, attrs){

			/*add class*/
			element.addClass('fa fa-sort-alpha-asc');

			/*recompile the element after adding the class*/
			// $compile(element)(scope);

		}
	};

}]);	