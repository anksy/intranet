'use strict';
angular.module('intranet')
.config(['stateHelperProvider', 
	function( stateHelperProvider ) {
		
		stateHelperProvider
        .state({
			name: 'documentUpload',
			url: '/file-managment',
			templateUrl: 'components/document-upload/views/document-upload.html',
			controller: 'documentUploadController',
		})
		.state({
			name: 'folderList',
			url: '/file-managment/:_id',
			templateUrl: 'components/document-upload/views/document-upload.html',
			controller: 'folderListController',
		});
		
}]);
