'use strict';
app.factory('Toaster', ['$mdToast','localStorageService','$mdDialog',
    function ($mdToast,localStorageService,$mdDialog) {
		return {
			simple: function(m, type) {
            type = (type) ? "success" : 'error';
            return $mdToast.show(
               $mdToast.simple()
                 .textContent(m)
                 .theme(type)
                 .position("top right")
                 .hideDelay(3000)
             );
			},
            saveUserSession: function(obj){

               if(obj.remember){
                    localStorageService.cookie.set("user_login",window.btoa(JSON.stringify(obj)),obj.expires);
                }
                else{
                    localStorageService.cookie.remove('user_login');
                }

                return true;
            },

            getUserSession: function(obj){
                if(localStorageService.cookie.get("user_login")){
                    return JSON.parse(window.atob(localStorageService.cookie.get("user_login")));
                }
                else{
                    return false;
                }
            },

            setSession: function(obj){
              
                // var expires = new Date();
                // expires.setTime(expires.getTime() + (30 * 60 * 1000));
                // expires.setDate(expires.getDate() + 1)
              

                if(obj.expires){
                    localStorageService.cookie.set("user",obj,obj.expires);
                }
                else{
                   
                     localStorageService.cookie.set("user",obj,1);
                }

                return localStorageService.cookie.get("user");
                //default 1 day 
            },

            getSession: function(){
                return localStorageService.cookie.get("user");
           
            },

            updateProfileImage: function(image){

                var obj=localStorageService.cookie.get("user");
                    obj.user.image=image;
                this.setSession(obj);
                return this.getSession();

            },
            updateUserInfo: function(user){

                var obj=localStorageService.cookie.get("user");
                var imageTemp= obj.user.image;
                    obj.user=user;
                    obj.user.image=imageTemp;
                this.setSession(obj);
                return this.getSession();

            },
            removeSession: function(){

                localStorageService.cookie.remove('user');
                return true;
            },
            confirm: function(obj){

                var confirm = $mdDialog.confirm()
                  .title(obj.title)
                  .textContent(obj.message)
                  .ariaLabel('confirm')
                  .targetEvent(obj.event)
                  .ok('Yes')
                  .cancel('No');

                return $mdDialog.show(confirm);
            }

		};
}]);