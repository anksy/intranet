'use strict';app.controller('SettingController', ['$scope', '$location', 'REST','Toaster','$parse',"$mdDialog","Upload","api_path","$rootScope",
    function($scope, $location, REST, Toaster,$parse, $mdDialog, Upload, api_path, $rootScope) {
    	

        REST.GET("get-settings").then(function(response){
                if(response.success){
                    var i,o,v,t,m;
                    for(i = 0; i < response.output.length ; i++){
                         o = response.output[i].meta_key;
                         v = response.output[i].meta_value;
                         t = 'settings.'+o;
                         m = $parse(t);
                         m.assign($scope, v);
                    }
                }
        });

        $scope.updateSettings = function(){
            REST.PUT("update-settings", $scope.settings).then(function(response){
                if(response.success){
                    Toaster.simple(response.message,true);
                }
            });
        };

        $scope.myImage='';
        $scope.myCroppedImage='';
        $scope.aspectRatio=0;

        $scope.selectFile = function(file, isShow) {
            var allowed_image_extensions = ['image/jpeg', 'image/jpg', 'image/png'];
            if (file && allowed_image_extensions.indexOf(file.type) === -1) {
                Toaster.simple("You can only upload image having file extension jpg, jpeg or png", false);
                return;
            }
            self.filename = (file) ? file.name : '';
            var reader = new FileReader();
            reader.onload = function(evt) {
                $scope.$apply(function($scope) {
                    $scope.myImage = evt.target.result;
                    if (isShow) {
                        $scope.cropImagePopup();
                    }
                });
            };
            reader.readAsDataURL(file);
        };

        $scope.cropImagePopup = function() {
            $mdDialog.show({
                contentElement: '#imageDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        };   

        $scope.uploadProfileImage = function(image, name) {
            var img = {
                dataUrl: image,
                imageName: self.filename
            };
            Upload.upload({
                url: api_path+'update-logo',
                data: {
                    file: Upload.dataUrltoBlob(img.dataUrl, img.imageName)
                }
            }).then(function(response) {
                console.log(response);
                $rootScope.closeDialog();
            });
        };
    }
]);