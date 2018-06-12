'use strict';
app.factory('sortIcon', [ function () {
		return {
			set: function(event) {

            var sortType;  
            if($(event.target).hasClass("fa-sort-alpha-asc")){
               $(".sort i").attr("class","fa fa-sort-alpha-asc");
               $(event.target).removeClass("fa-sort-alpha-asc").addClass("fa-sort-alpha-desc");
               sortType = 1;
            }else{
               $(".sort i").attr("class","fa fa-sort-alpha-asc");
               $(event.target).addClass("fa-sort-alpha-asc").removeClass("fa-sort-alpha-desc");
               sortType = 0;
            }
            return sortType;
			}
		};
}]);