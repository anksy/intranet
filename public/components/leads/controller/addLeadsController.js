'use strict';
angular.module('intranet')
.controller('addLeadsController', ['$scope','$rootScope','$state','services','$timeout', "$location",
	function ($scope, $rootScope, $state, services, $timeout, $location) {
	$scope.user={};

	let request = {
			url: window._API_PATH.addEmployee,
			method:'POST',
			data: {_id:$rootScope.isLogin._id}
		};
		$scope.selectedProducts = [{}];
		
		

		if($state.params.id){
			services.http({
				url: window._API_PATH.getLead,
				method: 'GET',
				params: { _id: $rootScope.isLogin._id, leadId: $state.params.id }
			})
			.then(res => {
				$scope.isLoading = false;
				$scope.lead = res.data;
				$scope.isEdit = true;
			})
			.catch(err => {
				$scope.isLoading = false;
			});
		}else{

			$scope.lead = {
				notes: [],
				products : [{}]
			}
		}

		/* $scope.products = [
			{ title: "Product A" },
			{ title: "Product B" },
			{ title: "Product C" },
			{ title: "Product D" },
			{ title: "Product E" }
		]; */

		$scope.plusMinus = function (action = 'plus', index = null) {
			if (action === 'plus') {
				/*add one empty product to add*/
				$scope.lead.products.push({});
			} else {
				/*remove one product*/
				$scope.lead.products.splice(index, 1);
			}
		}

		$scope.getProducts = function() {
			services.http({	
				url: "https://lightingoftomorrow.com/products.php",
				method: 'GET'
			})
			.then(r => console.log("e........"))
			.catch(e => console.log(e));
		}

		$scope.getProducts();


		$scope.submitForm = (form, lead) => {
		if(form.$valid){

			$scope.isLoading = true;

			let request = { _id: $rootScope.isLogin._id, data: lead };
			if ($state.params.id) request.leadId = $state.params.id;
			services.http({
				url: $state.params.id ? window._API_PATH.editLead : window._API_PATH.addLead,
				method: $state.params.id ? 'PUT' : 'POST',
				data: request
			})
			.then( res => {
				$scope.isLoading = false;
				$scope.user={};
				form.$setPristine();
				form.$setUntouched();

				$scope.alert={type:'success', message:res.message };
				$location.path("/leads");
			})
			.catch(err => {
				//define error
				$scope.isLoading = false;
				$scope.alert=services.getError(err);
			});
		}
	};

}]);

