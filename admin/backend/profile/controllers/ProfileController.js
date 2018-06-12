'use strict';app.controller('ProfileController', ['Upload', '$routeParams', '$scope', '$rootScope', '$location', 'REST', 'Toaster','$mdDialog','api_path',
    function(Upload, $routeParams, $scope, $rootScope, $location, REST, Toaster, $mdDialog, api_path) {

        $scope.tab = $routeParams.tab;

        adminProfileInfo();
  
        function adminProfileInfo() {
            REST.GET('profile-info').then(function(response) {
                $scope.user = response.output;
            });
        }

        $scope.updateProfile = function() {

            $scope.isLoading=true;
            REST.POST('update-profile', $scope.user).then(function(response) {
                $scope.isLoading=false;
                if (response.success) {
                    //update cookies and sesstion
                    $rootScope.isLogin=Toaster.updateUserInfo($scope.user);
                }
                Toaster.simple(response.message,response.success);
            });
        };   
        
        $scope.changePassword = function() {

            var obj = {
                currentPassword: $scope.user.old,
                password: $scope.user.new,
                _id: $scope.user._id
            };
            if ($scope.user.confirm === $scope.user.new) {
                REST.POST('changePassword', obj).then(function(response) {
                    if(response.success){
                        $scope.user.new = null;
                        $scope.user.old = null;
                        $scope.user.confirm = null;
                        $scope.passwordForm.$setPristine();
                        $scope.passwordForm.$setUntouched();
                    }
                    Toaster.simple(response.message,response.success);
                });
            } else {
                Toaster.simple("Confirm password must be same as New Password",false);
            }
        };

        $scope.myImage='';
        $scope.myCroppedImage='';
        $scope.aspectRatio=2.8;

        $scope.selectFile = function(file, isShow) {
            if(file){
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
            }
        };

        $scope.cropImagePopup = function() {
            $mdDialog.show({
                contentElement: '#imageDialog',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            });
        };  


        $scope.closeDialog = function(){
            $scope.myImage='';
            $scope.myCroppedImage='';
            $mdDialog.hide();
            
           };

        $scope.uploadProfileImage = function(image, name) {
            var img = {
                dataUrl: image,
                imageName: self.filename
            };
            Upload.upload({
                url: api_path+'update-profile-image',
                data: {
                    file: Upload.dataUrltoBlob(img.dataUrl, img.imageName)
                }
            }).then(function(response) {
                $rootScope.closeDialog();
                
                $rootScope.isLogin=Toaster.updateProfileImage(response.data.output);

                  if (response.data.success){
                    adminProfileInfo();
                }
            });
        };       
       
    }
]);