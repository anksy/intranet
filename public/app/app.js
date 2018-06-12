'use strict';
angular.module('intranet')
.run(['$rootScope', function($rootScope){
    /* initialize valiable */
    $rootScope.themeColor = 'indigo';
    //left sidebar ripple color
    $rootScope.leftSidebarMenuRipple = "#000";
    //toolbar ripple color
    $rootScope.toolbarMenuRipple = "#312e2e";
    // theme default option value
    $rootScope.themeOptions = "fixed-sidebar fixed-toolbar";
    // tooltip for collapsed sidebar
    $rootScope.collapsedTooltipText = "Collapsed";
    $rootScope.showTooltipForCollapsed = "hide-collapsed-ls-tooltip";
}])
.run(['$rootScope','services','$state','$log', function($rootScope,services,$state, $log){
    $rootScope.base_url = window._env.base_url;
    $rootScope.template = {
        noPictureTemplate :'/assets/images/no-picture.png'
    };

    if(services.getSession()){
      let session = services.getSession();
      $rootScope.isLogin=session.user;

      $rootScope.isCookies = session ? ( session.session ? session.session :false ): false;
    }

    $rootScope.logOut = () => {
        $rootScope.isLogin=services.removeSession();
        $state.go('login');
    };

    $rootScope.getToken = () => {

        if(Object.keys(services.getSession()).length > 0){
            var token = services.getSession().session ? services.getSession().session.token :  services.getSession().user.token;
            if (token) { return token; }
            else{  return false; }
        }
    };

    window._log = (message) => {
        $log.debug(message);
    };
    
    $rootScope.updateUserSession = () => {
        if($rootScope.isLogin)  services.setSession($rootScope.isLogin);
        if($rootScope.isCookies) services.setSession($rootScope.isCookies );
    };


    $rootScope.isEmpty = (obj) => {
        if(angular.equals({},obj) === true) {
            return false;
        }else{ return true;}
    };
}]);