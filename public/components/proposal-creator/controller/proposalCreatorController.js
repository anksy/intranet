'use strict';
angular.module('intranet')
.controller("proposalCreatorController", [
    '$scope',
    '$rootScope',
    '$location',
    'services',
    '$mdDialog',
    '$log',
    '$q',
    '$http',
    'filterFilter',
    '$timeout',
    ($scope, $rootScope, $location, services, $mdDialog, $log, $q, $http, filterFilter, $timeout) => {
        /** Code from here */   
        $scope.selectedProducts = [];
        $scope.proposal= { products:[] }; 

        $scope.addNew = () => {
            $scope.selectedProducts.push({});
            // $scope.proposal.products.push({ title:"kdhgdskj"});
        }

        // list of `state` value/display objects
        $scope.isProductLoading= true;
        $http({ url: window._API_PATH.products, method: 'get' })
            .then(res => { $scope.states = res.data; $scope.isProductLoading = false; }).catch(err =>   console.log(err));

        $scope.querySearch = ( query ) => {
            var results = query ? filterFilter($scope.states, query) : [], deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        $scope.selectedItemChange = (item)  => {
            if(item) {
                $scope.selectedProducts.push(item);
                $scope.proposal.products.push(item);
                $scope.searchText = '';               
            }
        }

        $scope.remove = (index) => {
            $scope.selectedProducts.splice(index, 1);
            $scope.proposal.products.splice(index, 1); 
        }

        $scope.calc = (product, i) => {
            if (product.qty && product.price){
                $scope.proposal.products[i].extended_cost = (product.price * product.qty).toFixed(2);
            }
            return false;
        }

        $scope.selectedFile = (file, index) =>{
            if (file) {
                if( !$scope.proposal.products[index] ) {
                    $scope.proposal.products[index] = {};
                }
              $scope.proposal.products[index].file = file;
           
            }
        }

        $scope.submitForm = (form, data) => {
            console.log(data)
        }

    }
]);