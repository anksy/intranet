angular.module('intranet')
//scroll to top 
.directive('mdFolder', ['$timeout','$rootScope', function ($timeout,$rootScope) {
	return {
		templateUrl:'components/document-upload/views/folder-list.html'
	};
}])
.directive('iconType', ['$timeout','$rootScope', function ($timeout,$rootScope) {
	return {
		template:`
				<img ng-src="{{isFile}}" fallback-Src='assets/fileIcons/file.svg' ng-if="isFile"  class="folder-icon md-whiteframe-2dp">
				<md-icon ng-if="!isFile" class="folder-icon md-whiteframe-2dp">folder</md-icon>
			`,
		link: (scope, ele) => {
			scope.setIcon = () => {
				// fileIcons
				let mineType = scope.folder.mimeType;

				if(mineType && mineType.indexOf('image') >=0){
					scope.isFile = scope.folder.attachment.secure_url ;
				}else{
					let filesExt = scope.folder.attachment.secure_url.split('.').clean();
					let fileType  = filesExt[filesExt.length-1];
					scope.isFile =`assets/fileIcons/${fileType}.svg`;
				}
				
			};

			if(scope.folder && scope.folder.attachment) {
				scope.setIcon();
			}
			else{
				scope.isFile =null;
			}
		}
	};
}]);

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};