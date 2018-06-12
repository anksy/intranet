'use strict';app.controller('DashboardController', ['$mdDialog', '$cookies', '$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','$mdDateLocale','$httpParamSerializer',
    function($mdDialog, $cookies, $timeout, $routeParams, $scope, $rootScope, $location, REST, $mdDateLocale, $httpParamSerializer) {
    	var text;
        $scope.currentDate=new Date();
        $scope.maxdate= new Date();
        $scope.graph={};
        $scope.graph.endDate=new Date();
        $scope.graph.startDate=moment().subtract(1,'months');

    
    	//get dashbaord info listing 
    
    	/**
    	 * [getDashboardInfo get list of basic information like total jobs, Total AMC, Total Revenue]
    	 * @return {[type]} [scope array with object]
    	 */
    	
    	$scope.getDashboardInfo = function(){
	    	REST.GET('get-dashboard-statistics',{}).then(function(response){
	    		$scope.dashboardInfo=response.output;
	    	});
    	};

    	/**
    	 * [getJobsInfo get recent job listing]
    	 * @return {[type]} [scope array with object]
    	 */
    	$scope.getJobsInfo = function(ev){
    		if(ev){
    			text=ev.target.innerHTML;
				ev.target.innerHTML="<i class='fa fa-spinner fa-spin'></i>";
    		}

	    	REST.GET('get-job-statistics',{}).then(function(response){
	    		 $scope.jobList=response.output;
	    		if(ev){
    			$timeout(function(){
	    			 	ev.target.innerHTML=text;
	    			 },300);
    			}
	    	});
    	};

    	/**
    	 * [getPaymentInfo get payment list and statistics]
    	 * @return {[type]} [scope array with object]
    	 */
    	$scope.getPaymentInfo = function(ev){
    		if(ev){
    			text=ev.target.innerHTML;
				ev.target.innerHTML="<i class='fa fa-spinner fa-spin'></i>";
    		}

	    	REST.GET('get-payment-statistics',{}).then(function(response){
	    		 $scope.paymentList=response.output;
	    		 if(ev){
    			$timeout(function(){
	    			 	ev.target.innerHTML=text;
	    			 },300);
    			}
	    	});
    	};

    	/**
    	 * [suggestion description]
    	 * @return {[type]} [description]
    	 */
    	$scope.suggestions = function(ev){
            if(ev){
                text=ev.target.innerHTML;
                ev.target.innerHTML="<i class='fa fa-spinner fa-spin'></i>";
            }

            $rootScope.query.order="created_at";
            
	    	REST.GET('list-feedback?'+$httpParamSerializer($rootScope.query)).then(function(response){
	    		$scope.suggestion=response.output;
                if(ev){
                    $timeout(function(){
                        ev.target.innerHTML=text;
                    },300);
                }
	    	});
    	};

    	$scope.recentlyRegistered = function(keywords,ev){
			
			if(ev){
				text=ev.target.innerHTML;
				ev.target.innerHTML="<i class='fa fa-spinner fa-spin'></i>";    	
			}

	    	REST.GET('get-recently-registered?type='+keywords).then(function(response){
	    		 $scope.recentlyRegisteredList=response.output;
	    		 if(ev){
	    		 	$timeout(function(){
	    			 	ev.target.innerHTML=text;
	    			 },300);
	    		 }
	    	});
    	};

        $scope.monthlyGraph = function(obj){
          
            $timeout(function(){

            $scope.isLoading=true;
            REST.GET('get-monthly-report',{request:obj}).then(function(response){
                /**
                *  initialize graph and report 
                */
                  AmCharts.makeChart("graph", Object.assign(chat_options(),response.output));
     
                $timeout(function(){
                    $scope.isLoading=false;
                   },300);

             
                
            });
            },350);
        };


    	$scope.getDashboardInfo();
    	$scope.getJobsInfo();
    	$scope.getPaymentInfo();
    	$scope.suggestions();
    	$scope.recentlyRegistered('company');

        $scope.monthlyGraph($scope.graph);

    	Dashboard.init();

       $scope.gone=function(form,obj){

          if(form.$invalid){
                return;
            }

            if(obj){

              $scope.monthlyGraph(obj);
            }
       };
         
     
        /**
         *  initialize graph and report 
         */
        // AmCharts.makeChart("graph", Object.assign(chat_options(),chart_data));

    }
]);

function checkdate(start,end){

    var startDate = new Date(start);
    var  endDate   = new Date(end);
    var date  = new Date();
    var range = moment().range(startDate, endDate);

    return range.contains(date); // false
}

function chat_options(){
    var options={
            type: "serial",
            pathToImages:'assets/img/',
            theme: "light",
            dataDateFormat: "YYYY-MM-DD",
            precision: 2,
            chartScrollbar: {
                graph: "g1",
                oppositeAxis: false,
                offset: 30,
                scrollbarHeight: 50,
                backgroundAlpha: 0,
                selectedBackgroundAlpha: 0.1,
                selectedBackgroundColor: "#888888",
                graphFillAlpha: 0,
                graphLineAlpha: 0.5,
                selectedGraphFillAlpha: 0,
                selectedGraphLineAlpha: 1,
                autoGridCount: true,
                color: "#AAAAAA"
          },
          chartCursor: {
            pan: true,
            valueLineEnabled: true,
            valueLineBalloonEnabled: true,
            cursorAlpha: 0,
            valueLineAlpha: 0.2
          },
          categoryField: "date",
            categoryAxis: {
                parseDates: true,
                dashLength: 1,
                minorGridEnabled: true
                },
            legend: {
                useGraphSettings: true,
                position: "top"
              },
            balloon: {
            borderThickness: 1,
            shadowAlpha: 0
          },
          

        };
        return options;
}