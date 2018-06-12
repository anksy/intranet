'use strict';
angular.module('intranet')
    .config(['stateHelperProvider',
        function (stateHelperProvider) {
            stateHelperProvider
                .state({
                    name: 'proposalCreator',
                    url: '/proposal-creator',
                    templateUrl: 'components/proposal-creator/views/proposal-creator.html',
                    controller: 'proposalCreatorController',
                })
        }]);
