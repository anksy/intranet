'use strict';

app.factory('confirmationDialog', ['$mdDialog', function($mdDialog) {
    return {
        confirm: function(ev, cb) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete ?')
                .textContent('Note: This is temporary delete. It can be restore.')
                .targetEvent(ev)
                .ok('Ok')
                .cancel('Cancel');

                cb($mdDialog.show(confirm));
        }
    };
}]);