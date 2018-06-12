'use strict';app.controller('PaymentController', ['$mdDialog', '$cookies', '$timeout', '$routeParams', '$scope', '$rootScope', '$location', 'REST','Toaster','$httpParamSerializer','Top',
    function($mdDialog, $cookies, $timeout, $routeParams, $scope, $rootScope, $location, REST, Toaster,$httpParamSerializer,Top) {
    	
        /*Type - Payment*/
        $rootScope.query.order = "title";

    	$scope.listPayments = function(){
		    REST.GET('list-payments?'+$httpParamSerializer($rootScope.query)).then(function(response){
		    	$scope.data = response.output;
                Top.Scroll();
		    });
    	};

    	$scope.listPayments();


        $scope.paymentDetails = function(){
            REST.GET('get-payment?_id='+$routeParams.id)
            .then(function(response){
                $scope.charge = response.output;
            });
        };

        if($routeParams.id) $scope.paymentDetails();


        $scope.refundPayment = function(event){
            if(!$scope.charge) return false;

            var confirm = $mdDialog.confirm()
                  .title('Would you really like to refund amount?')
                  .ariaLabel('Refund Payment')
                  .targetEvent(event)
                  .ok('Yes!')
                  .cancel('No');

            $mdDialog.show(confirm).then(function() {
              REST.POST("refund-payment", {
                chargeId : $scope.charge.chargeId,
                Identifier : $scope.charge.meta.Identifier
              }).then(function(response){
                    $scope.paymentDetails();
                    Toaster.simple(response.message,response.success);
                });
            });
        };

        $scope.transferPayment = function(event){
            if(!$scope.charge) return false;

            var confirm = $mdDialog.confirm()
                  .title('Would you really like to transfer amount?')
                  .ariaLabel('Refund Payment')
                  .targetEvent(event)
                  .ok('Yes!')
                  .cancel('No');

            $mdDialog.show(confirm).then(function() {
              REST.POST("transfer-payment", {
                chargeId : $scope.charge.chargeId,
                Identifier : $scope.charge.meta.Identifier
              }).then(function(response){
                    $scope.paymentDetails();
                    Toaster.simple(response.message,response.success);
                });
            });
        };

    }

]);