'use strict';
app.factory('Top', ['$mdToast', 
    function ($mdToast) {
		return {
			Scroll: function() {
            return $('html,body').animate({
					  scrollTop: 0
					},500);
			}
		};
}]);