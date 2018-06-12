'use strict';

angular.module('intranet')
//scroll to top 
.directive('userImage', ['$timeout','$rootScope', function ($timeout,$rootScope) {
	return {
		scope:{type:'='},
		template: `<img ng-src="{{image}}">`,
		link: function link(scope, ele) {
			scope.image = ($rootScope.isLogin && $rootScope.isLogin.image) ? ( $rootScope.isLogin.image) : $rootScope.template.noPictureTemplate;
		}
	};
}]).directive('scrollToTop', ['$timeout', function ($timeout) {
	return {
		template: '\n\t\t\t\t<md-button \n\t\t\t\t\tscroll-Top  \n\t\t\t\t\tng-click="scrollToTop()" \n\t\t\t\t\tclass="md-fab md-mini fadeInUp scrollToTop" \n\t\t\t\t\taria-label="scrollTop">\n\t\t\t\t\t<md-icon >close</md-icon>\n\t\t\t\t</md-button>',
		link: function link(scope, ele) {

			scope.icons = '';

			$(window).scroll(function () {

				if ($(window).scrollTop() > 200) {
					$('.scrollToTop').fadeIn();
				} else {
					$('.scrollToTop').fadeOut();
				}
			});

			scope.scrollToTop = function () {

				$('html,body').animate({
					scrollTop: 0
				}, 650);
			};
		}
	};
}])
//alert template 
/*
	alert={
		message:[your message] , 
		type:'error | suucess'
	}
 */
.directive('alertMessage', ['$timeout', function ($timeout) {
	return {
		restrict: 'E',
		template: '<div class="alert" \n\t\t\tng-class="{\'alert-error\':alert.type==\'error\',\'alert-success\':alert.type==\'success\'}"\n\t\t\tlayout="row" layout-align="space-between center">\n\t\t\t\t<div class="msg" ng-bind-html="alert.message"></div>\n\t\t\t<md-button class="md-icon-button" ng-click="close()" aria-label="close">\n\t\t\t<md-icon>close</md-icon>\n\t\t\t</md-button>\n\t\t\t</div>',
		link: function link(scope, ele) {
			scope.close = function () {
				delete scope.$parent.$parent.alert;
				delete scope.$parent.alert;
			};
		}
	};
}])

//confirm password 
.directive('passwordVerify', function () {

	return {
		require: 'ngModel',
		scope: {
			passwordVerify: '=',
			ngModel: '='
		},
		link: function link(scope, element, attrs, ctrl) {

			scope.$watch('ngModel', function (val) {
				if (val) {
					check();
				}
			});

			scope.$watch('passwordVerify', function (val) {
				if (val) {
					check();
				}
			});

			var check = function check() {
				if (scope.passwordVerify === scope.ngModel) {
					ctrl.$setValidity('passwordVerify', true);
				} else {

					ctrl.$setValidity('passwordVerify', false);
				}
			};
		}
	};
})
//progress button
//<md-loader ng-if="loading" loading="loading"> Loading..</md-loader>
.directive('mdLoader', [function () {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			loading: '='
		},
		template: '<div ng-if="loading" layout="row"  layout-align="center center">\n                        <md-progress-circular  md-diameter="20px" md-mode="indeterminate"></md-progress-circular>\n                        &nbsp;<small ng-transclude></small>\n\t               </div>'
	};
}])
//move to next element
.directive('moveNextOnMaxlength', [function () {
	return {
		link: function link(scope, ele) {

			ele.on("input", function (e) {

				if (ele.val().length == ele.attr("maxlength")) {
					var $nextElement = ele.next();

					if ($nextElement.length) {
						$nextElement[0].focus();
					}
				}
			});

			ele.on('keyup', function (e) {
				if (e.keyCode == 8) {
					var $prevElement = ele.prev();
					if ($prevElement.length) {
						$prevElement[0].focus();
					}
				}
			});
		}
	};
}]).directive('fallbackSrc', function () {
	return {
		link: function postLink(scope, iElement, iAttrs) {

			iElement.bind('error', function () {
				angular.element(this).attr("src", iAttrs.fallbackSrc);
			});
		}
	};
});
