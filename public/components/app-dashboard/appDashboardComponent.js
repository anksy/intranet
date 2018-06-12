'use strict';
angular.module('intranet')
.controller('dashbaordController', ['$scope','$rootScope', 
	function($scope, $rootScope) {

		$scope.dashboardChart1 = {
        "type": "ColumnChart",
        "data": [
            ['Month', 'PageView', 'Average'],
            ['Jan', 998, 614.6],
            ['Feb', 1268, 682],
            ['Mar', 807, 623],
            ['Apr', 968, 609.4],
            ['May', 1026, 569.6]
        ],
        "options": {
            title: 'Monthly PageView',
            vAxis: { title: 'PageView' },
            hAxis: { title: 'Month' },
            seriesType: 'bars',
            series: { 1: { type: 'line' } },
            legend: { position: 'bottom' }
        }
    };

    //  Monthly users charts
    $scope.dashboardChart2 = {
        "type": "ColumnChart",
        "data": [
            ['Month', 'PageView', 'Average'],
            ['Jan', 938, 614.6],
            ['Feb', 1120, 682],
            ['Mar', 1167, 623],
            ['Apr', 615, 609.4],
            ['May', 629, 569.6]
        ],
        "options": {
            title: 'Monthly Users',
            vAxis: { title: 'Users' },
            hAxis: { title: 'Month' },
            legend: { position: 'bottom' },
            isStacked: true
        }
    };

    //  Monthly bounce rate
    $scope.dashboardChart3 = {
        "type": "PieChart",
        "data": [
            ['Month', 'Bounce Rate'],
            ['Jan', 614.6],
            ['Feb', 682],
            ['Mar', 623],
            ['Apr', 609.4],
            ['May', 569.6]
        ],
        "options": {
            title: 'Monthly Bounce Rate',
            is3D: true,
        }
    };

    //  Sessions by county
    $scope.dashboardChart4 = {
        "type": "GeoChart",
        "data": [
            ['Country', 'Sessions'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 500],
            ['France', 600],
            ['RU', 700]
        ],
        "options": {}
    };
	
}]);

