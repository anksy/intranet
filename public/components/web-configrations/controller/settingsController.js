'use strict';
angular.module('intranet')
.controller('settingsController', ['$scope','$mdDialog','services','$rootScope','Upload','$timeout',
	($scope,$mdDialog, services , $rootScope,Upload,$timeout) => {

    // $scope.setting={title:"te"};

		$scope.getSettings = function (){
		services.http({
            url: window._API_PATH.getSettings,
            method:'GET',
            params: {_id: $rootScope.isLogin._id}
			}).then(res=> {
                if(res.output){
                    res.output.forEach((elem) => {
                        $scope.setting[elem.meta_key] = elem.meta_value;
                    })
                }
            }).catch(err=>console.log("Asdasdasd"))
        };

        $scope.getSettings();
        
        $scope.updateSettings = function () {
            services.http({
                url: window._API_PATH.updateSettings,
                method: 'POST',
                data: $scope.setting
            }).then(res => console.log(res)).catch(err => false)
        };

		$scope.uploadFileToServer = (file) => {
            if(!file) { return $scope.updateSettings();}
            var File = { file: file };
            angular.merge(File, $scope.setting);
            Upload.upload({
                url:  window._API_PATH.updateSettings,
                data: File
            }).then(function (resp) {
                console.log(resp);
            }, function (resp) {
                console.log(resp);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $timeout(() => { 
                }, 200); 
            });

        };
	
}]);