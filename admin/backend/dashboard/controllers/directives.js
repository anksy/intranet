'use strict';app.directive('easypieChart',['$timeout',function($timeout){
    return{
        link: function(scope, ele){
            
            $timeout(function(){
                ele.easyPieChart({
                    animate: 1000,
                    size: 75,
                    lineWidth: 3,
                    barColor: App.getBrandColor('yellow')
                });

           },500);
        }
    };
}]);