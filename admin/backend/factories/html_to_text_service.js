'use strict';
app.factory('htmlToText', [function () {
	return {
		convert: function(html){
			var tag = document.createElement('div');
			tag.innerHTML = html;
			var text = tag.innerText;
			return text;
		}
	};
}]);