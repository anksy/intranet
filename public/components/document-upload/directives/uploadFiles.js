angular.module('intranet')
//scroll to top 
.directive('uploadFileCustom', ['$timeout','$rootScope','$mdDialog','services', 
	function ($timeout,$rootScope,$mdDialog,services) {
	return {
		template:`
		 <md-button class="md-button-text" 
		 	ngf-select="uploadFiles($files)" 
		 	ngf-drop="uploadFiles($files)" 
		 	multiple="multiple" > 
            <md-icon>file_upload</md-icon>
            <span > Upload </span>
          </md-button>
		`,

		link:(scope, ele) => {

			scope.files=[];
			 scope.uploadFiles = (files)	=> {
			 	if(files && files.length>=0){
			 		angular.forEach(files, (file, key)=> {
			 			scope.files.push(file);
			 		});
			 		scope.openDiaglog();
				}
			};

			scope.openDiaglog = () => {

				$mdDialog.show({
			      controller: "fileUploadDiaglogController",
			      templateUrl: 'components/document-upload/views/file-upload-diaglog.html',
			      clickOutsideToClose:false,
			      hasBackdrop:false,
			      fullscreen: false,// Only for -xs, -sm breakpoints.
			      scope: scope.$new(), //pass parent scope to contoller 
			      onShowing: (scope, ele) => {
			      
			      	ele.addClass('file-on-upload');
			      	$timeout(() => {
			      	let mask = document.getElementsByClassName('md-scroll-mask');
				      	mask[0].remove();
				    $('body').removeClass('md-dialog-is-showing');
			      });
			      }
			    })
			    .then(function(folder) {
			    	$rootScope.$broadcast('updateList'); 
			    }, function(folder) { 	$rootScope.$broadcast('updateList');  });
			};
				// scope.openDiaglog();
		}
	};
}]);

