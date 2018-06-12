/* ///////////////////////////   ConsoleBox controller js ///////////////////////////////// */
'use strict';

/********************************** Service description ************************  

********* Angularjs *********

$scope- The scope is the binding part between the HTML (view) and the JavaScript (controller).
$window- A reference to the browser's window object.
$interval- The $interval service is AngularJS' version of the window.setInterval function.
$http-  The service makes a request to the server, and lets your application handle the response.

$compile- Compiles an HTML string or DOM into a template and produces a template function, which can then be used to link scope and the template together.

$timeout-  The $timeout service is AngularJS' version of the window.setTimeout function.
$q-  A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.

$log-  Simple service for logging.
$element-  Wraps a raw DOM element or HTML string as a jQuery element.

$rootScope-  All applications have a $rootScope which is the scope created on the HTML element that contains the ng-app directive.

********* Angular Material*********

$mdToast-  $mdToast is a service to build a toast notification on any position on the screen with an optional duration, and provides a simple promise API.

$mdDialog-  $mdDialog opens a dialog over the app to inform users about critical information or require them to make decisions.

$mdConstant- Use md-separator-keys to customize the key codes which trigger chip creation.
$mdBottomSheet-  $mdBottomSheet opens a bottom sheet over the app and provides a simple promise API.
$mdPanel-  $mdPanel is a robust, low-level service for creating floating panels on the screen. It can be used to implement tooltips, dialogs, pop-ups, etc.


********* Data Table*********

$mdEditDialog-  It used for edit dialog in data table



***************************************** End Service description ***********************/

// initialize app
angular.module('intranet')

// initialize run
.run(function($rootScope) {
    // pre page loader
    $('#pre-page-loader').delay(200).fadeOut('slow');
})

// initialize controllers

.controller('materialCtrl', ['$scope', '$window', '$interval', '$http', '$mdToast', '$mdDialog', '$compile', '$timeout', '$q', '$log', '$mdConstant', '$element', '$mdEditDialog', '$mdBottomSheet', '$mdPanel', '$rootScope', function($scope, $window, $interval, $http, $mdToast, $mdDialog, $compile, $timeout, $q, $log, $mdConstant, $element, $mdEditDialog, $mdBottomSheet, $mdPanel, $rootScope) {

    'use strict';

    /*////////////////////////////////////// Body ////////////////////////////*/

    // /* initialize valiable */
    // $scope.themeColor = 'indigo';
    // // Theme color

    // //left sidebar ripple color
    // $scope.leftSidebarMenuRipple = "#000";
    // //toolbar ripple color
    // $scope.toolbarMenuRipple = "#312e2e";
    // // theme default option value
    // $scope.themeOptions = "fixed-sidebar fixed-toolbar";

    // // tooltip for collapsed sidebar
    // $scope.collapsedTooltipText = "Collapsed";
    // $scope.showTooltipForCollapsed = "hide-collapsed-ls-tooltip";

    //  full screen
    $scope.fullscreenPage = function() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    };

    // scroll page bottom to top
    $scope.scrollToTop = function() {
        $("body,html").animate({ scrollTop: 0 }, "slow");
    };
    // tooltip for search
    $scope.searchTooltipText = "Open";
    // show and hide search box
    $scope.showHideSearchClass = "theme-search-hide";
    $scope.showHideSearch = function() {
        $scope.showHideSearchClass = ($scope.showHideSearchClass == "theme-search-hide") ? "" : "theme-search-hide";
        $scope.searchTooltipText = ($scope.searchTooltipText == "Open") ? "Close" : "Open";
    };


    // show and hide right sidebar
    $scope.showHideRightSidebarClass = "theme-right-sidebar-hide";
    $scope.showHideRightSidebar = function() {
        $scope.showHideRightSidebarClass = ($scope.showHideRightSidebarClass == "theme-right-sidebar-hide") ? "" : "theme-right-sidebar-hide";
    };

    // left sidebar menu
    $(document).on('click', '.side-menu-label', function() {
        if ($('#theme-page-control').hasClass('collapsed-left-sidebar')) {
            if ($(this).hasClass('menu-active')) return;
            else {
                $('.side-menu-label').removeClass("menu-active");
                $(this).addClass('menu-active');
                $('.side-menu-label-body').slideUp();
                $(this).next('.side-menu-label-body').slideDown();
                return;
            }

        }
        if ($(this).hasClass('menu-active')) {
            $(this).removeClass("menu-active");
            $(this).next('.side-menu-label-body').slideUp();
        } else {
            $('.side-menu-label').removeClass("menu-active");
            $(this).addClass('menu-active');
            $('.side-menu-label-body').slideUp();
            $(this).next('.side-menu-label-body').slideDown();
        }
        $('.side-menu-label-1').removeClass("menu-active1");

    });


    // show and hide sidebar for moble and tablet
    $scope.mdSidebar = "";
    $scope.showHideLeftSidebar = function() {
        $scope.mdSidebar = ($scope.mdSidebar == "md-left-sidebar") ? "" : "md-left-sidebar";
    };

    // collapsed left sidebar
    $scope.collapsedsidebarClass = "";
    $scope.collapsedLeftSidebar = function() {
        $scope.collapsedsidebarClass = ($scope.collapsedsidebarClass == "collapsed-left-sidebar") ? "" : "collapsed-left-sidebar";
        $scope.collapsedTooltipText = ($scope.collapsedTooltipText == "Collapsed") ? "Open" : "Collapsed";
        $scope.showTooltipForCollapsed = ($scope.showTooltipForCollapsed == "hide-collapsed-ls-tooltip") ? "show-collapsed-ls-tooltip" : "hide-collapsed-ls-tooltip";
    };

    $(document).on('click', '.collapsed-left-sidebar .menu-has-label', function() {
        $scope.$apply(function() {
            $scope.collapsedsidebarClass = "";
            //  hide tooltip of sidemenu when open sidebar
            $scope.showTooltipForCollapsed = "hide-collapsed-ls-tooltip";
            $scope.collapsedTooltipText = "Collapsed";
        });
    });

    // right sidebar layout option default checkbox value
    $scope.layoutOptions = {
        option1: '1'
    };

    // configure page throught right sidebar options
    $scope.layoutOptionsConfigure = function() {
        switch ($scope.layoutOptions.option1) {
            case "1":
                $scope.themeOptions = "fixed-sidebar fixed-toolbar";
                break;
            case "2":
                $scope.themeOptions = "unfixed-sidebar fixed-toolbar";
                break;
            case "3":
                $scope.themeOptions = "unfixed-sidebar unfixed-toolbar";
                break;
            case "4":
                $scope.themeOptions = "layout-boxed fixed-sidebar fixed-toolbar";
                break;
            case "5":
                $scope.themeOptions = "layout-boxed unfixed-sidebar fixed-toolbar";
                break;
            case "6":
                $scope.themeOptions = "layout-boxed unfixed-sidebar unfixed-toolbar";
                break;
        }
    };

    /*  theme dialog */

    //  open dialog box
    $(document).on('click', '[data-toggle="theme-dialog"]', function() {
        var targetThemeDialog = $(this).attr("data-dialogTarget");
        $('body').append('<div class="theme-dialog-overlay"></div>');
        $('#' + targetThemeDialog).removeClass('theme-dialog-hide').addClass('theme-dialog-show').css({ "display": "block", "opacity": 1 });
    });
    // close dialog box
    $(document).on('click', '.theme-dialog-close,.theme-dialog-overlay', function() {
        $('.theme-dialog').removeClass('theme-dialog-show').addClass('theme-dialog-hide');
        $timeout(function() {
            $('.theme-dialog-overlay').remove();
            $('.theme-dialog').css({ "display": "none", "opacity": 0 });
        }, 300);
    });

    /*////////////////////////////////////// End Body ////////////////////////////*/


    /*////////////////////////////////////// Dashboard ////////////////////////////*/


    //  Monthly pageview charts

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

    // Open Project Data Table

    $scope.dashboardOpenProjectList = {
        "count": 9,
        "data": [{
            "name": "UI Prototyping",
            "dueDate": "March 24",
            "progess": { "value": 70 }
        }, {
            "name": "Testing and Delivery",
            "dueDate": "April 01",
            "progess": { "value": 30 }
        }, {
            "name": "Ongoing Maintanance",
            "dueDate": "May 24",
            "progess": { "value": 50 }
        }, {
            "name": "Development",
            "dueDate": "June 21",
            "progess": { "value": 50 }
        }, {
            "name": "Design",
            "dueDate": "July 09",
            "progess": { "value": 65 }
        }]
    };

    $scope.dashboardOpenProjectDemo = {
        limitOptions: [5, 10, 15],
        query: {
            order: 'name',
            limit: 5,
            page: 1
        }
    };

    //  Language data table

    $scope.languageDataTableData = {
        "count": 10,
        "data": [{
            "name": "Chinese",
            "sessions": "522",
            "users": "998",
            "pageviews": "450",
            "BounceRate": "614.6",
            "country": "United States"

        }, {
            "name": "Spanish",
            "sessions": "599",
            "users": "1268",
            "pageviews": "288",
            "BounceRate": "682",
            "country": "China"

        }, {
            "name": "English",
            "sessions": "587",
            "users": "807",
            "pageviews": "397",
            "BounceRate": "623",
            "country": "Japan"

        }, {
            "name": "Hindi",
            "sessions": "615",
            "users": "968",
            "pageviews": "215",
            "BounceRate": "609.4",
            "country": "Germany"

        }, {
            "name": "Arabic",
            "sessions": "629",
            "users": "1026",
            "pageviews": "366",
            "BounceRate": "569.6",
            "country": "United Kingdom"

        }, {
            "name": "Portuguese",
            "sessions": "522",
            "users": "998",
            "pageviews": "450",
            "BounceRate": "614.6",
            "country": "India"

        }, {
            "name": "Bengali",
            "sessions": "938",
            "users": "1120",
            "pageviews": "1167",
            "BounceRate": "614.6",
            "country": "France"

        }, {
            "name": "Russian",
            "sessions": "522",
            "users": "615",
            "pageviews": "450",
            "BounceRate": "614.6",
            "country": "Brazil"

        }, {
            "name": "Japanese",
            "sessions": "1026",
            "users": "998",
            "pageviews": "366",
            "BounceRate": "614.6",
            "country": "Italy"

        }, {
            "name": "Punjabi/Lahnda",
            "sessions": "522",
            "users": "998",
            "pageviews": "450",
            "BounceRate": "614.6",
            "country": "Canada"

        }, ]
    };

    $scope.languageDataTableDemo = {
        limitOptions: [5, 10, 15],
        query: {
            order: 'name',
            limit: 5,
            page: 1
        }
    };

    //  country data table
    $scope.countryDataTableDemo = {
        limitOptions: [5, 10, 15],
        query: {
            order: 'country',
            limit: 5,
            page: 1
        }
    };

    /*////////////////////////////////////// End Dashboard ////////////////////////////*/


    /*////////////////////////////////////// Progress Determinate Demo ////////////////////////////*/

    $scope.demoDeterminateValue = 30;
    $scope.demoDeterminateValue2 = 30;
    // Iterate every 100ms, non-stop and increment
    // the Determinate loader.
    $interval(function() {

        $scope.demoDeterminateValue += 1;
        $scope.demoDeterminateValue2 += 1.5;
        if ($scope.demoDeterminateValue > 100) {
            $scope.demoDeterminateValue = 30;
        }
        if ($scope.determinateValue2 > 100) {
            $scope.demoDeterminateValue2 = 30;
        }

    }, 100);

    /*//////////////////////////// End Progress Determinate Demo ///////////////////////*/


    /*////////////////////////////////////// Toast Demo ////////////////////////////*/

    //  basic
    $scope.simpleToast = function(toastPosition) {
        $mdToast.show(
            $mdToast.simple()
            .textContent('Simple Toast!')
            .position(toastPosition)
            .hideDelay(3000)
        );
    };

    //  toast with action
    $scope.actionToast = function() {
        var toast = $mdToast.simple()
            .textContent('Marked as read')
            .action('UNDO')
            .highlightAction(true)
            .highlightClass('md-warn') // Accent is used by default, this just demonstrates the usage.
            .position('top')
            .hideDelay(3000);

        $mdToast.show(toast).then(function(response) {
            if (response == 'ok') {
                alert('You clicked the \'UNDO\' action.');
            }
        });
    };

    //  custom toast
    $scope.showCustomToast = function() {
        $mdToast.show({
            hideDelay: 3000,
            position: 'top right',
            template: '<md-toast> <span class="md-toast-text" flex>Custom toast!</span> <md-button class="md-warn"> More info </md-button> <md-button> Close </md-button> </md-toast>'
        });
    };

    /*////////////////////////////////////// End Toast Demo ////////////////////////////*/

    /*////////////////////////////////////// pagination Demo ////////////////////////////*/

    $scope.currentPage = 0;

    $scope.paging = {
        total: 100,
        current: 1,
        onPageChanged: loadPages
    };

    function loadPages() {
        // TODO : Load current page Data here
        $scope.currentPage = $scope.paging.current;
    }

    /*////////////////////////////////////// End pagination Demo ////////////////////////////*/

    /*////////////////////////////////////// Dialog Demo ////////////////////////////*/

    // Small
    $scope.showSmallAlert = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                template: '<md-dialog aria-label="Dialog" flex="40" flex-xs="90">' +
                    '<md-toolbar>' +
                    '<div class="md-toolbar-tools">' +
                    '<h2>Dialog Header</h2>' +
                    '<span flex></span>' +
                    '<md-button class="md-icon-button" ng-click="cancelDialog()">' +
                    '<i class="material-icons" aria-label="Close dialog">close</i>' +
                    '</md-button>' +
                    '</div>' +
                    '</md-toolbar>' +
                    '<md-dialog-content>' +
                    '<p class="md-padding">A bunch of text</p>' +
                    '</md-dialog-content>' +
                    '<md-dialog-actions layout="row">' +
                    '<md-button ng-click="answer()" md-ink-ripple="#F44336">Not Useful</md-button>' +
                    '<md-button ng-click="answer()" class="m-r-20">Useful</md-button>' +
                    '</md-dialog-actions>' +
                    '</md-dialog>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('You click on button, its hide dialog')
                    .position('top right')
                    .hideDelay(3000)
                );
            });
    };

    // Medium
    $scope.showMediumAlert = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                template: '<md-dialog aria-label="Dialog" flex="60" flex-xs="90">' +
                    '<md-toolbar>' +
                    '<div class="md-toolbar-tools">' +
                    '<h2>Dialog Header</h2>' +
                    '<span flex></span>' +
                    '<md-button class="md-icon-button" ng-click="cancelDialog()">' +
                    '<i class="material-icons" aria-label="Close dialog">close</i>' +
                    '</md-button>' +
                    '</div>' +
                    '</md-toolbar>' +
                    '<md-dialog-content>' +
                    '<p class="md-padding">A bunch of text</p>' +
                    '</md-dialog-content>' +
                    '<md-dialog-actions layout="row">' +
                    '<md-button ng-click="answer()" md-ink-ripple="#F44336">Not Useful</md-button>' +
                    '<md-button ng-click="answer()" class="m-r-20">Useful</md-button>' +
                    '</md-dialog-actions>' +
                    '</md-dialog>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent('You click on button, its hide dialog')
                    .position('top right')
                    .hideDelay(3000)
                );
            });
    };

    // Large(default)
    $scope.showDefaultAlert = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            template: '<md-dialog aria-label="Dialog">' +
                '<md-toolbar>' +
                '<div class="md-toolbar-tools">' +
                '<h2>Dialog Header</h2>' +
                '<span flex></span>' +
                '<md-button class="md-icon-button" ng-click="cancelDialog()">' +
                '<i class="material-icons" aria-label="Close dialog">close</i>' +
                '</md-button>' +
                '</div>' +
                '</md-toolbar>' +
                '<md-dialog-content>' +
                '<p class="md-padding">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>' +
                '</md-dialog-content>' +
                '<md-dialog-actions layout="row">' +
                '<md-button ng-click="hideDialog()" md-ink-ripple="#F44336">Not Useful</md-button>' +
                '<md-button ng-click="hideDialog()" class="m-r-20">Useful</md-button>' +
                '</md-dialog-actions>' +
                '</md-dialog>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };

    // Pre-Rendered Dialog

    $scope.showPrerenderedDialog = function(ev) {
        $mdDialog.show({
            contentElement: '#myPrerenderedDialog',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    };

    //Alert Dialog
    $scope.openSimpleAlert = function(ev) {
        $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('This is an alert title')
            .textContent('You can specify some description text in here.')
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            .targetEvent(ev)
        );
    };
    //Confirm Dialog
    $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your debt?')
            .textContent('All of the banks have agreed to forgive you your debts.')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Please do it!')
            .cancel('Sounds like a scam');

        $mdDialog.show(confirm).then(function() {
            $mdToast.show(
                $mdToast.simple()
                .textContent('You decided to get rid of your debt.')
                .position('top right')
                .hideDelay(3000)
            );

        }, function() {
            $mdToast.show(
                $mdToast.simple()
                .textContent('You decided to keep your debt.')
                .position('top right')
                .hideDelay(3000)
            );
        });
    };


    function DialogController($scope, $mdDialog) {
        // Cancel Dialog
        $scope.cancelDialog = function() {
            $mdDialog.cancel();
        };

        //Hide  Dialog
        $scope.answer = function() {
            $mdDialog.hide();
        };
        $scope.hideDialog = function() {
            $mdDialog.hide();
        };
    }

    /*////////////////////////////////////// End Dialog Demo ////////////////////////////*/

    /*////////////////////////////////////// Slider Demo ////////////////////////////*/

    $scope.value = {
        value1: Math.floor(Math.random() * 255),
        value2: Math.floor(Math.random() * 255),
        value3: Math.floor(Math.random() * 255),
        value4: Math.floor(Math.random() * 255)
    };

    $scope.rating1 = 3;
    $scope.rating2 = 2;
    $scope.rating3 = 4;
    $scope.rating4 = 2;
    $scope.rating5 = 4;

    $scope.invert = Math.floor(Math.random() * 100);

    /*////////////////////////////////////// End Slider Demo ////////////////////////////*/

    /*////////////////////////////////////// SweetAlert Demo ////////////////////////////*/

    //  Basic Usage
    $scope.demo1 = function() {
        swal("Here's a message!");
    };

    //  Demo2
    $scope.demo2 = function() {
        swal("Here's a message!", "It's pretty, isn't it?");
    };

    //  Demo3
    $scope.demo3 = function() {
        swal("Good job!", "You clicked the button!", "success");
    };

    //  Demo4
    $scope.demo4 = function() {
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false,
                customClass: 'warning-msg-modal'
            },
            function() {
                swal("Deleted!", "Your imaginary file has been deleted.", "success");
            });
    };

    //  Demo5
    $scope.demo5 = function() {
        swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false,
                customClass: 'warning-msg-modal'
            },
            function(isConfirm) {
                if (isConfirm) {
                    swal("Deleted!", "Your imaginary file has been deleted.", "success");
                } else {
                    swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
    };

    //  Demo6
    $scope.demo6 = function() {
        swal({
            title: "Sweet!",
            text: "Here's a custom image.",
            imageUrl: "../../asset/images/thumbs-up.jpg"
        });
    };

    //  Demo7
    $scope.demo7 = function() {
        swal({
            title: "HTML <small>Title</small>!",
            text: "A custom <span style='color: #F8BB86 '>html<span> message.",
            html: true
        });
    };

    //  Demo8
    $scope.demo8 = function() {
        swal({
            title: "Auto close alert!",
            text: "I will close in 2 seconds.",
            timer: 2000,
            showConfirmButton: false
        });
    };

    //  Demo9
    $scope.demo9 = function() {
        swal({
                title: "An input!",
                text: "Write something interesting:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            },
            function(inputValue) {
                if (inputValue === false) return false;

                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false;
                }

                swal("Nice!", "You wrote: " + inputValue, "success");
            });
    };

    //  Demo10
    $scope.demo10 = function() {
        swal({
                title: "Ajax request example",
                text: "Submit to run ajax request",
                type: "info",
                showCancelButton: true,
                closeOnConfirm: false,
                showLoaderOnConfirm: true,
            },
            function() {
                setTimeout(function() {
                    swal("Ajax request finished!");
                }, 2000);
            });
    };

    /*////////////////////////////////////// End SweetAlert Demo ////////////////////////////*/

    /*////////////////////////////////////// Chart Demo ////////////////////////////*/

    /*  Chartjs Demo */

    //  Area chart
    $scope.area = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        series: ['Series A', 'Series B'],
        data: [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ],
        datasetOverride: [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }],
        colors: ['#1A237E', '#C62828'],
        options: {
            title: {
                display: true,
                text: 'Visitors Area Chart'
            },
            scales: {
                yAxes: [{
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            },
            legend: { display: true }
        }
    };

    //  Bar chart
    $scope.bar = {
        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        series: ['Series A', 'Series B'],
        data: [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ],
        colors: [{
                backgroundColor: "#3F51B5",
                borderColor: "#1A237E"
            },
            {
                backgroundColor: '#F44336',
                borderColor: '#B71C1C'
            }
        ],
        options: {
            title: {
                display: true,
                text: 'Visitors Bar Chart'
            },
            legend: { display: true }
        }
    };

    //  Line chart
    $scope.line = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        series: ['Series A', 'Series B'],
        data: [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ],
        datasetOverride: [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }],
        colors: [{
                backgroundColor: "transparent",
                borderColor: "#1A237E"
            },
            {
                backgroundColor: "transparent",
                borderColor: '#B71C1C'
            }
        ],
        options: {
            title: {
                display: true,
                text: 'Visitors Line Chart'
            },
            scales: {
                yAxes: [{
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            },
            legend: { display: true },
        }
    };

    //  Pie Chart
    $scope.pie = {
        labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
        data: [
            400, 300, 100, 800, 600
        ],
        colors: [{
            backgroundColor: '#C62828',
            pointBackgroundColor: '#EF5350'
        }, {
            backgroundColor: '#D84315',
            pointBackgroundColor: '#FF7043'
        }, {
            backgroundColor: '#FFA000',
            pointBackgroundColor: '#FFCA28'
        }, {
            backgroundColor: '#2E7D32',
            pointBackgroundColor: '#66BB6A'
        }, {
            backgroundColor: '#1976D2',
            pointBackgroundColor: '#64B5F6'
        }],
        options: {
            title: {
                display: true,
                text: 'Colors Pie Chart'
            },
            legend: { display: true },
        }
    };

    //  Doughnut Chart
    $scope.doughnut = {
        labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
        data: [
            400, 300, 100, 800, 600
        ],
        colors: [{
            backgroundColor: '#C62828',
            pointBackgroundColor: '#EF5350'
        }, {
            backgroundColor: '#D84315',
            pointBackgroundColor: '#FF7043'
        }, {
            backgroundColor: '#FFA000',
            pointBackgroundColor: '#FFCA28'
        }, {
            backgroundColor: '#2E7D32',
            pointBackgroundColor: '#66BB6A'
        }, {
            backgroundColor: '#1976D2',
            pointBackgroundColor: '#64B5F6'
        }],
        options: {
            title: {
                display: true,
                text: 'Colors Doughnut Chart'
            },
            legend: { display: true },
        }
    };

    //  Radar Chart
    $scope.radar = {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        data: [
            [65, 59, 90, 81, 56, 55, 40],
            [28, 48, 40, 19, 96, 27, 100]
        ],

        colors: ['#1A237E', '#B71C1C'],
        options: {
            title: {
                display: true,
                text: 'Radar Chart'
            }
        }
    };

    //  Polar Area Chart
    $scope.polarArea = {
        labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
        data: [
            400, 300, 100, 800, 600
        ],
        colors: [{
            backgroundColor: '#C62828',
            pointBackgroundColor: 'rgba(255, 99, 132,0.4)'
        }, {
            backgroundColor: '#D84315',
            pointBackgroundColor: 'rgba(100, 181, 246, 0.4)'
        }, {
            backgroundColor: '#FFA000',
            pointBackgroundColor: 'rgba(102, 187, 106, 0.4)'
        }, {
            backgroundColor: '#2E7D32',
            pointBackgroundColor: 'rgba(255, 202, 40, 0.4)'
        }, {
            backgroundColor: '#1976D2',
            pointBackgroundColor: 'rgba(255, 112, 67, 0.4)'
        }],
        options: {
            title: {
                display: true,
                text: 'Colors Polar Area Chart'
            },
            legend: { display: true },
        }
    };

    //  Horizontal Bar chart
    $scope.horizontalBar = {
        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        series: ['Series A', 'Series B'],
        data: [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ],
        colors: [{
                backgroundColor: "#3F51B5",
                borderColor: "#1A237E"
            },
            {
                backgroundColor: '#F44336',
                borderColor: '#B71C1C'
            }
        ],
        options: {
            title: {
                display: true,
                text: 'Visitors Horizontal Bar Chart'
            },
            legend: { display: true }
        }
    };

    // Mixed Type chart
    $scope.mixedtype = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: ['Series A', 'Series B'],
        data: [
            [65, -59, 80, 81, -56, 55, -40],
            [28, 48, -40, 19, 86, 27, 90]
        ],
        colors: ['#1A237E', '#448AFF'],
        options: {
            title: {
                display: true,
                text: 'Visitors Mixed Type Chart'
            },
            legend: { display: true }
        },
        datasetOverride: [{
                label: "Bar chart",
                borderWidth: 1,
                type: 'bar'
            },
            {
                label: "Line chart",
                borderWidth: 3,
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                type: 'line'
            }
        ]
    };

    /* Google Charts Demo */

    //  Area Chart
    $scope.googleAreaChart = {
        "type": "AreaChart",
        "displayed": false,
        "data": [
            ['Year', 'Sales', 'Expenses'],
            ['2013', 1000, 400],
            ['2014', 1170, 460],
            ['2015', 660, 1120],
            ['2016', 1030, 540]
        ],
        "options": {
            title: 'Company Performance',
            hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 }
        }
    };

    //  Bar Chart
    $scope.googleBarChart = {
        "type": "BarChart",
        "displayed": false,
        "data": [
            ['Year', 'Sales', 'Expenses', 'Profit'],
            ['2014', 1000, 400, 200],
            ['2015', 1170, 460, 250],
            ['2016', 660, 1120, 300],
            ['2017', 1030, 540, 350]
        ],
        "options": {
            chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            }
        }
    };

    //  Column Chart
    $scope.googleColumnChart = {
        "type": "ColumnChart",
        "displayed": false,
        "data": [
            ['Year', 'Sales', 'Expenses', 'Profit'],
            ['2014', 1000, 400, 200],
            ['2015', 1170, 460, 250],
            ['2016', 660, 1120, 300],
            ['2017', 1030, 540, 350]
        ],
        "options": {
            chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
            }
        }
    };

    //  Line Chart
    $scope.googleLineChart = {
        "type": "LineChart",
        "displayed": false,
        "data": [
            ['Year', 'Sales', 'Expenses'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]
        ],
        "options": {
            chart: {
                title: 'Average Temperatures and Daylight in Iceland Throughout the Year'
            },
            series: {
                // Gives each series an axis name that matches the Y-axis below.
                0: { axis: 'Temps' },
                1: { axis: 'Daylight' }
            },
            axes: {
                // Adds labels to each axis; they don't have to match the axis names.
                y: {
                    Temps: { label: 'Temps (Celsius)' },
                    Daylight: { label: 'Daylight' }
                }
            }
        },
        "formatters": {}
    };

    //  Pie Chart
    $scope.googlePieChart = {
        "type": "PieChart",
        "data": [
            ['Task', 'Hours per Day'],
            ['Work', 11],
            ['Eat', 2],
            ['Commute', 2],
            ['Watch TV', 2],
            ['Sleep', 7]
        ],
        "options": {
            title: 'My Daily Activities'
        }
    };

    //  Donut Chart
    $scope.googleDonutChart = {
        "type": "PieChart",
        "data": [
            ['Task', 'Hours per Day'],
            ['Work', 11],
            ['Eat', 2],
            ['Commute', 2],
            ['Watch TV', 2],
            ['Sleep', 7]
        ],
        "options": {
            title: 'My Daily Activities',
            pieHole: 0.4
        }
    };

    //  Bubble Chart

    $scope.googleBubbleChart = {
        "type": "BubbleChart",
        "data": [
            ['ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population'],
            ['CAN', 80.66, 1.67, 'North America', 33739900],
            ['DEU', 79.84, 1.36, 'Europe', 81902307],
            ['DNK', 78.6, 1.84, 'Europe', 5523095],
            ['EGY', 72.73, 2.78, 'Middle East', 79716203],
            ['GBR', 80.05, 2, 'Europe', 61801570],
            ['IRN', 72.49, 1.7, 'Middle East', 73137148],
            ['IRQ', 68.09, 4.77, 'Middle East', 31090763],
            ['ISR', 81.55, 2.96, 'Middle East', 7485600],
            ['RUS', 68.6, 1.54, 'Europe', 141850000],
            ['USA', 78.09, 2.05, 'North America', 307007000]
        ],
        "options": {
            title: 'Correlation between life expectancy, fertility rate ' +
                'and population of some world countries (2010)',
            hAxis: { title: 'Life Expectancy' },
            vAxis: { title: 'Fertility Rate' },
            bubble: { textStyle: { fontSize: 11 } }
        }
    };

    //  Combo Chart

    $scope.googleComboChart = {
        "type": "ColumnChart",
        "data": [
            ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
            ['2004/05', 165, 938, 522, 998, 450, 614.6],
            ['2005/06', 135, 1120, 599, 1268, 288, 682],
            ['2006/07', 157, 1167, 587, 807, 397, 623],
            ['2007/08', 139, 1110, 615, 968, 215, 609.4],
            ['2008/09', 136, 691, 629, 1026, 366, 569.6]
        ],
        "options": {
            title: 'Monthly Coffee Production by Country',
            vAxis: { title: 'Cups' },
            hAxis: { title: 'Month' },
            seriesType: 'bars',
            series: { 5: { type: 'line' } }
        }
    };

    //  Gauge Chart

    $scope.googleGaugeChart = {
        "type": "Gauge",
        "data": [
            ['Label', 'Value'],
            ['Memory', 80],
            ['CPU', 55],
            ['Network', 68]
        ],
        "options": {
            width: 400,
            height: 120,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
            minorTicks: 5
        }
    };

    // Scatter Chart
    $scope.googleScatterChart = {
        "type": "ScatterChart",
        "displayed": false,
        "data": [
            ['Age', 'Weight', 'Height'],
            [8, 12, 25],
            [4, 5.5, 11],
            [11, 14, 9],
            [4, 5, 2],
            [3, 3.5, 7],
            [6.5, 7, 8.5]
        ],
        "options": {
            title: 'Age vs. Weight and Height Comparison'
        }
    };

    //  Geo Chart
    $scope.googleGeoChart = {
        "type": "GeoChart",
        "data": [
            ['Country', 'Popularity'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 500],
            ['France', 600],
            ['RU', 700]
        ],
        "options": {}
    };

    /*//////////////////////////////////////End Chart Demo ////////////////////////////*/

    /*//////////////////////////////////////Form Element Demo ////////////////////////////*/

    /*  Form Validations Demo */

    $scope.validationOptions = {
        rules: {
            username: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            },
            confirmPassword: {
                required: true,
                minlength: 5,
                equalTo: "[name=password]"
            },
            url: {
                required: true,
                url: true
            },
            comment: {
                required: true,
                minlength: 15
            }
        },
        //For custom messages
        messages: {
            username: {
                required: "Enter a username",
                minlength: "Enter at least 5 characters."
            },
            url: "Enter your website URL",
            confirmPassword: "Your enter password is different.",
        },
        errorElement: 'div',
        errorPlacement: function(error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    };

    $scope.registerUserForm = function(form) {
        if (form.validate()) {
            alert('valid!');
        }
    };

    /*  Form Mask Demo */

    $scope.formMaskOptions = {

        date: {
            date: true,
            datePattern: ['Y', 'm', 'd'],
            delimiters: ['-', '-', '-']
        },
        date1: {
            date: true,
            datePattern: ['m', 'd', 'Y']
        },
        creditCard: {
            creditCard: true,
            delimiter: '-'
        },
        purchaseCode: {
            blocks: [6, 3, 3, 3],
            prefix: 'ISBN',
            uppercase: true,
            delimiters: ['-', '-', '-', '-']
        },
        currency: {
            numeral: true,
            prefix: '$ ',
            rawValueTrimPrefix: true
        },
        mobile: {
            blocks: [10]
        }
    };

    $scope.model = {
        date: '',
        date1: '',
        creditCard: '',
        purchaseCode: 'ISBN',
        currency: '$ ',
        mobile: ''
    };

    /*  Text Editor Demo  */

    $scope.editorTitle = '<h1>Your Text Editor</h1>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>' +
        '<p><br></p>' +
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>' +
        '<p><br></p><p><br></p>';

    /*  Autocomplete Demo */

    $scope.autocompleteDemo = {
        // Disable caching of queries
        isDisabled: false,
        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        querySearch: function(query) {
            var results = query ? $scope.states.filter($scope.createFilterFor(query)) : $scope.states,
                deferred;
            if ($scope.simulateQuery) {
                deferred = $q.defer();
                $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        },
        searchTextChange: function(text) {
            $log.info('Text changed to ' + text);
        },
        selectedItemChange: function(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        },
        /**
         * Build `states` list of key/value pairs
         */
        loadAll: function() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia, Wisconsin, Wyoming';

            return allStates.split(/, +/g).map(function(state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        },
        newState: function(state) {
            alert("Sorry! You'll need to create a Constitution for " + state + " first!");
        }

    };

    //Create filter function for a query string

    $scope.createFilterFor = function(query) {
        var lowercaseQuery = angular.lowercase(query);

        return $scope.filterFn = function(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
        };

    };

    //Simulate query for results
    $scope.simulateQuery = false;

    // list of `state` value/display objects
    $scope.states = $scope.autocompleteDemo.loadAll();


    /* Checkbox Demo */

    //Basic Usage    
    $scope.basicCheckboxDemo = {
        cb1: true,
        cb2: false,
        cb3: false,
        cb4: false,
        cb5: false,
        cb6: true
    };

    //Select All

    $scope.selectAllCheckboxItems = [1, 2, 3, 4, 5];
    $scope.selectAllCheckbox = [1];
    $scope.selectAllCheckboxDemo = {
        toggle: function(item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            } else {
                list.push(item);
            }
        },

        exists: function(item, list) {
            return list.indexOf(item) > -1;
        },

        isIndeterminate: function() {
            return ($scope.selectAllCheckbox.length !== 0 &&
                $scope.selectAllCheckbox.length !== $scope.selectAllCheckboxItems.length);
        },

        isChecked: function() {
            return $scope.selectAllCheckbox.length === $scope.selectAllCheckboxItems.length;
        },

        toggleAll: function() {
            if ($scope.selectAllCheckbox.length === $scope.selectAllCheckboxItems.length) {
                $scope.selectAllCheckbox = [];
            } else if ($scope.selectAllCheckbox.length === 0 || $scope.selectAllCheckbox.length > 0) {
                $scope.selectAllCheckbox = $scope.selectAllCheckboxItems.slice(0);
            }
        }
    };

    //  color options
    $scope.colorCheckboxDemo = {
        cb1: true,
        cb2: true,
        cb3: true,
        cb4: true,
        cb5: true,
        cb6: true,
        cb7: true
    };

    /* ***********  Chips Demo ******************/

    /* Basic Usage */

    $scope.basicChipsDemo = {
        fruitNames: ['Apple', 'Banana', 'Orange'],
        fruitNames1: ['Lime', 'Lemon', 'Jambul'],
        fruitNames2: ['Cloudberry', 'Quince', 'Mango'],
        fruitNames3: ['Apricot', 'Bilberry', 'Blueberry'],
        fruitNames4: ['Avocado', 'Blackberry', 'Blackcurrant'],
        tags: [],
        vegObjs: [{
                'name': 'Broccoli',
                'type': 'Brassica'
            },
            {
                'name': 'Cabbage',
                'type': 'Brassica'
            },
            {
                'name': 'Carrot',
                'type': 'Umbelliferous'
            }
        ],
        newVeg: function(chip) {
            return {
                name: chip,
                type: 'unknown'
            };
        }
    };

    /*   Custom Separator Keys */
    var semicolonChipsDemo = 186;
    $scope.separatorKeysChipsDemo = {
        contacts: ['test@example.com'],
        name: ['John Doe'],
        customKeys: [$mdConstant.KEY_CODE.ENTER, semicolonChipsDemo],
        customKeys1: [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA],

    };

    /* Custom Inputs */

    $scope.customInputsChipsDemo = {
        selectedItem: null,
        searchText: null,
        querySearch: querySearchCustomInputsChip,
        vegetables: loadVegetablesCustomInputsChip(),
        selectedVegetables: [],
        numberChips: [],
        numberChips2: ['1234'],
        numberBuffer: '',
        autocompleteDemoRequireMatch: true,
        transformChip: transformCustomInputsChip
    };

    //  Return the proper object when the append is called.
    function transformCustomInputsChip(chip) {
        // If it is an object, it's already a known chip
        if (angular.isObject(chip)) {
            return chip;
        }

        // Otherwise, create a new one
        return { name: chip, type: 'new' }
    }

    //  Search for vegetables.
    function querySearchCustomInputsChip(query) {
        var results = query ? $scope.customInputsChipsDemo.vegetables.filter(createFilterForCustomInputsChip(query)) : [];
        return results;
    }

    //  Create filter function for a query string
    function createFilterForCustomInputsChip(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(vegetable) {
            return (vegetable._lowername.indexOf(lowercaseQuery) === 0) ||
                (vegetable._lowertype.indexOf(lowercaseQuery) === 0);
        };

    }
    //load all vegitables
    function loadVegetablesCustomInputsChip() {
        var veggies = [{
                'name': 'Broccoli',
                'type': 'Brassica'
            },
            {
                'name': 'Cabbage',
                'type': 'Brassica'
            },
            {
                'name': 'Carrot',
                'type': 'Umbelliferous'
            },
            {
                'name': 'Lettuce',
                'type': 'Composite'
            },
            {
                'name': 'Spinach',
                'type': 'Goosefoot'
            }
        ];

        return veggies.map(function(veg) {
            veg._lowername = veg.name.toLowerCase();
            veg._lowertype = veg.type.toLowerCase();
            return veg;
        });
    }

    /* Datepicker Demo */

    // Basic Usage
    $scope.basicDatepickerDemo = {
        myDate1: new Date(),
        myDate2: new Date(),
        myDate3: new Date(),
        myDate4: new Date(),
        myDate5: new Date(),
        isOpen: false
    };

    //Validations
    $scope.validationsmyDateDemo = {
        myDate1: new Date(),
        myDate2: new Date(),
        myDate3: new Date(),
        myDate4: new Date()
    };

    $scope.validationsDatepickerDemo = {
        minDate: new Date(
            $scope.validationsmyDateDemo.myDate1.getFullYear(),
            $scope.validationsmyDateDemo.myDate1.getMonth() - 2,
            $scope.validationsmyDateDemo.myDate1.getDate()
        ),

        maxDate: new Date(
            $scope.validationsmyDateDemo.myDate1.getFullYear(),
            $scope.validationsmyDateDemo.myDate1.getMonth() + 2,
            $scope.validationsmyDateDemo.myDate1.getDate()
        ),

        onlyWeekendsPredicate: function(date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        }
    };

    /* File Input */

    //Callback function
    $scope.fileInputDemo = {
        //  event fire when click on selected file
        onFileClick: function(obj, idx) {
            console.log(obj);
        },
        //  event fire when remove on selected file
        onFileRemove: function(obj, idx) {
            console.log(obj);
        }
    };

    /*  Radio Button Demo */

    // Basic Usage

    $scope.basicUsageRadioButton = {
        group1: 'Banana'
    };

    // Color Option

    $scope.colorOptionRadioButton = {
        group: 'primary'
    };

    /*  Switch Demo */

    // Basic Usage

    $scope.basicUsageSwitch = {
        cb1: true,
        cb2: 'yup',
        cb3: false,
        cb4: true,
        cb5: true,
        cb6: false,
        onChange: function(cbState) {
            $scope.message = cbState;
        }
    };

    //  Color Options

    $scope.colorOptionsSwitch = {
        cb1: true,
        cb2: true,
        cb3: true,
        cb4: true,
        cb5: true,
        cb6: true,
        cb7: true
    };

    /*  Select Demo */

    // Basic Usage

    $scope.basicUsageSelect = {
        demo1: '',
        demo2: 'sword',
        demo3: 'chain',
        demo4: '',
        demo5: ''
    };

    //  Multiple Select

    $scope.multipleSelect = {
        demo1: [],
        options: [
            { name: 'Option 1' },
            { name: 'Option 2' },
            { name: 'Option 3' },
            { name: 'Option 4' },
            { name: 'Option 5' },
            { name: 'Option 6' }
        ]
    };

    //Options With Async Search

    $scope.asyncSearchSelect = {
        user: null,
        users: null
    };

    $scope.asyncSearchSelectloadUsers = function() {

        // Use timeout to simulate a 650ms request.
        return $timeout(function() {

            $scope.asyncSearchSelect.users = $scope.asyncSearchSelect.users || [
                { id: 1, name: 'Scooby Doo' },
                { id: 2, name: 'Shaggy Rodgers' },
                { id: 3, name: 'Fred Jones' },
                { id: 4, name: 'Daphne Blake' },
                { id: 5, name: 'Velma Dinkley' }
            ];

        }, 650);
    };

    // Select Header

    $scope.headerSelectSearchTerm = {
        data: ''
    };
    $scope.headerSelect = {
        selectedVegetables: [],
        vegetables: ['Corn', 'Onions', 'Kale', 'Arugula', 'Peas', 'Zucchini'],

        clearSearchTerm: function() {
            $scope.headerSelectSearchTerm.data = '';
        },
        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        stopPropagation: function(ev) {
            ev.stopPropagation();
        }
    };

    // Select Text
    $scope.selectTextItem = {
        data: ''
    };
    $scope.selectTextDemo = {
        items: [1, 2, 3, 4, 5, 6, 7],
        getSelectedText: function() {
            if ($scope.selectTextItem.data) {
                return "You have selected: Item " + $scope.selectTextItem.data;
            } else {
                return "Please select an item";
            }
        }
    };

    //  Validations
    $scope.validationSelectDemo = {
        data: undefined
    };

    /*////////////////////////////////////// End Form Element Demo ////////////////////////////*/

    /*//////////////////////////////////////Data Table Demo ////////////////////////////*/

    // Basic Usage

    $scope.dessertsDemoData = {
        "count": 9,
        "data": [{
            "name": "Frozen yogurt",
            "type": "Ice cream",
            "calories": { "value": 159.0 },
            "fat": { "value": 6.0 },
            "carbs": { "value": 24.0 },
            "protein": { "value": 4.0 },
            "sodium": { "value": 87.0 },
            "calcium": { "value": 14.0 },
            "iron": { "value": 1.0 }
        }, {
            "name": "Ice cream sandwich",
            "type": "Ice cream",
            "calories": { "value": 237.0 },
            "fat": { "value": 9.0 },
            "carbs": { "value": 37.0 },
            "protein": { "value": 4.3 },
            "sodium": { "value": 129.0 },
            "calcium": { "value": 8.0 },
            "iron": { "value": 1.0 }
        }, {
            "name": "Eclair",
            "type": "Pastry",
            "calories": { "value": 262.0 },
            "fat": { "value": 16.0 },
            "carbs": { "value": 24.0 },
            "protein": { "value": 6.0 },
            "sodium": { "value": 337.0 },
            "calcium": { "value": 6.0 },
            "iron": { "value": 7.0 }
        }, {
            "name": "Cupcake",
            "type": "Pastry",
            "calories": { "value": 305.0 },
            "fat": { "value": 3.7 },
            "carbs": { "value": 67.0 },
            "protein": { "value": 4.3 },
            "sodium": { "value": 413.0 },
            "calcium": { "value": 3.0 },
            "iron": { "value": 8.0 }
        }, {
            "name": "Jelly bean",
            "type": "Candy",
            "calories": { "value": 375.0 },
            "fat": { "value": 0.0 },
            "carbs": { "value": 94.0 },
            "protein": { "value": 0.0 },
            "sodium": { "value": 50.0 },
            "calcium": { "value": 0.0 },
            "iron": { "value": 0.0 }
        }, {
            "name": "Lollipop",
            "type": "Candy",
            "calories": { "value": 392.0 },
            "fat": { "value": 0.2 },
            "carbs": { "value": 98.0 },
            "protein": { "value": 0.0 },
            "sodium": { "value": 38.0 },
            "calcium": { "value": 0.0 },
            "iron": { "value": 2.0 }
        }, {
            "name": "Honeycomb",
            "type": "Other",
            "calories": { "value": 408.0 },
            "fat": { "value": 3.2 },
            "carbs": { "value": 87.0 },
            "protein": { "value": 6.5 },
            "sodium": { "value": 562.0 },
            "calcium": { "value": 0.0 },
            "iron": { "value": 45.0 }
        }, {
            "name": "Donut",
            "type": "Pastry",
            "calories": { "value": 452.0 },
            "fat": { "value": 25.0 },
            "carbs": { "value": 51.0 },
            "protein": { "value": 4.9 },
            "sodium": { "value": 326.0 },
            "calcium": { "value": 2.0 },
            "iron": { "value": 22.0 }
        }, {
            "name": "KitKat",
            "type": "Candy",
            "calories": { "value": 518.0 },
            "fat": { "value": 26.0 },
            "carbs": { "value": 65.0 },
            "protein": { "value": 7.0 },
            "sodium": { "value": 54.0 },
            "calcium": { "value": 12.0 },
            "iron": { "value": 6.0 }
        }]
    };

    $scope.dataTableDemo = {
        limitOptions: [5, 10, 15],
        query: {
            order: 'name',
            limit: 5,
            page: 1
        }
    };

    /*//////////////////////////////////////End Data Table Demo ////////////////////////////*/


    /*//////////////////////////////////////Bottom Sheet Demo ////////////////////////////*/

    //  Show as List
    $scope.showListBottomSheetDemo = function() {
        $mdBottomSheet.show({
            template: '<md-bottom-sheet>' +
                '<md-subheader>Comment Actions</md-subheader>' +
                '<md-list>' +
                '<md-list-item>' +
                '<md-button> <i class="material-icons">share</i> share</md-button>' +
                '</md-list-item>' +
                '<md-list-item>' +
                '<md-button> <i class="material-icons">print</i> print</md-button>' +
                '</md-list-item>' +
                '<md-list-item>' +
                '<md-button md-autofocus="true"> <i class="material-icons">cloud_upload</i> upload</md-button>' +
                '</md-list-item>' +
                '<md-list-item>' +
                '<md-button> <i class="material-icons">content_copy</i> copy</md-button>' +
                '</md-list-item>' +
                '</md-list>' +
                '</md-bottom-sheet>',
        });
    };

    //  Show as Grid
    $scope.showGridBottomSheetDemo = function() {
        $mdBottomSheet.show({
            template: '<md-bottom-sheet>' +
                '<div layout="row" layout-align="center center">' +
                '<h4>Since <code class="language-markup">clickOutsideToClose = false</code>, drag down or press ESC to close</h4>' +
                '</div>' +
                '<div>' +
                '<md-list layout="row" layout-wrap>' +
                '<md-list-item flex>' +
                '<md-button> <i class="material-icons">share</i> share</md-button>' +
                '</md-list-item>' +
                '<md-list-item flex>' +
                '<md-button> <i class="material-icons">print</i> print</md-button>' +
                '</md-list-item>' +
                '<md-list-item flex>' +
                '<md-button md-autofocus="true"> <i class="material-icons">cloud_upload</i> upload</md-button>' +
                '</md-list-item>' +
                '<md-list-item flex>' +
                '<md-button> <i class="material-icons">content_copy</i> copy</md-button>' +
                '</md-list-item>' +
                '<md-list-item flex>' +
                '<md-button> <i class="material-icons">3d_rotation</i> rotation</md-button>' +
                '</md-list-item>' +
                '<md-list-item flex>' +
                '<md-button> <i class="material-icons">file_upload</i> file upload</md-button>' +
                '</md-list-item>' +
                '</md-list>' +
                '</div>' +
                '</md-bottom-sheet>',
            clickOutsideToClose: false
        });
    };

    /*//////////////////////////////////////End Bottom Sheet Demo ////////////////////////////*/

    /*//////////////////////////////////////FAB Speed Dial Demo ////////////////////////////*/

    $scope.fabSpeedDialDemo = {
        animationMode: ['md-fling', 'md-scale'],
        isOpen: false,
        isOpen1: true
    };
    /*//////////////////////////////////////End FAB Speed Dial Demo ////////////////////////////*/

    /*//////////////////////////////////////FAB Toolbar Demo ////////////////////////////*/

    $scope.fabToolbarDemo = {
        isOpen: false,
        isOpen1: false
    };

    /*//////////////////////////////////////End FAB Toolbar Demo ////////////////////////////*/


    /*////////////////////////////////////// List Demo ////////////////////////////*/

    //  List Controls

    $scope.listControlsDemo = {
        checkbox1: false,
        checkbox2: false,
        checkbox3: true
    };

    $scope.listControlsDemoDialog = function(event) {
        $mdDialog.show(
            $mdDialog.alert()
            .title('Primary Action')
            .textContent('Primary actions can be used for one click actions')
            .ariaLabel('Primary click demo')
            .ok('Awesome!')
            .targetEvent(event)
        );
    };

    $scope.listControlsDemoDialog1 = function(event) {
        $mdDialog.show(
            $mdDialog.alert()
            .title('Secondary Action')
            .textContent('Secondary actions can be used for one click actions')
            .ariaLabel('Secondary click demo')
            .ok('Neat!')
            .targetEvent(event)
        );
    };

    /*////////////////////////////////////// End List Demo ////////////////////////////*/


    /*////////////////////////////// Menu Bar Demo  //////////////////////////////*/

    $scope.menuBarsampleActionDemo = function(name, ev) {
        $mdDialog.show($mdDialog.alert()
            .title(name)
            .textContent('You triggered the "' + name + '" action')
            .ok('Great')
            .targetEvent(ev)
        );
    };

    $scope.menuBarSettings = {
        printLayout: true,
        showRuler: true,
        showSpellingSuggestions: true,
        presentationMode: 'edit'
    };

    /*//////////////////////////////  Nav Bar Demo //////////////////////////////*/

    //  basic usage
    $scope.navBarDemo = {
        currentNavItem: 'page1',
        goto: function(page) {
            console.log("Goto " + page);
        }
    }

    //  Disable Ink Bar
    $scope.navBarDemo1 = {
        currentNavItem: 'page2',
        goto: function(page) {
            console.log("Goto " + page);
        }
    }

    /*////////////////////////////// Sub Header Demo //////////////////////////////*/

    $scope.subHeaderDemo = {
        messages: [{
                face: '../../asset/images/user1.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face: '../../asset/images/user4.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face: '../../asset/images/user3.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face: '../../asset/images/user2.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face: '../../asset/images/user1.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face: '../../asset/images/user3.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face: '../../asset/images/user1.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face: '../../asset/images/user1.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face: '../../asset/images/user1.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face: '../../asset/images/user1.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                face: '../../asset/images/user3.jpg',
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
        ]
    };

    /*////////////////////////////// Swipe Demo //////////////////////////////*/

    $scope.swipeDemo = {
        onSwipeLeft: function(ev) {
            alert('You swiped left!!');
        },

        onSwipeRight: function(ev) {
            alert('You swiped right!!');
        },
        onSwipeUp: function(ev) {
            alert('You swiped up!!');
        },

        onSwipeDown: function(ev) {
            alert('You swiped down!!');
        }
    };


    /*////////////////////////////// Virtual Repeat Demo //////////////////////////////*/

    $scope.virtualRepeatDemoItems = [];
    for (var i = 0; i < 1000; i++) {
        $scope.virtualRepeatDemoItems.push(i);
    }

    /*////////////////////////////// Panel Demo //////////////////////////////*/

    //  Open dialog Box
    $scope.panelShowDialogDemo = function() {
        var position = $mdPanel.newPanelPosition()
            .absolute()
            .center();

        var config = {
            attachTo: angular.element(document.body),
            controller: PanelDialogCtrlDemo,
            disableParentScroll: false,
            template: '<div role="dialog" aria-label="Eat me!" layout="column">' +
                '<md-toolbar><div class="md-toolbar-tools"><h2>Surprise!</h2></div></md-toolbar>' +
                '<div class="md-padding">' +
                '<p>You hit the secret button. Here a donut:</p>' +
                '<div layout="row">' +
                '<img flex alt="Delicious donut" src="../../asset/images/donut.jpg" style="width:400px;height:200px">' +
                '</div>' +
                '</div>' +
                '<div layout="row" layout-align="center center">' +
                '<md-button md-autofocus class="md-primary" ng-click="closeDialogDemo()">Close</md-button>' +
                '</div>' +
                '</div>',
            hasBackdrop: true,
            panelClass: 'demo-dialog-example',
            position: position,
            trapFocus: true,
            zIndex: 150,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: true
        };

        $mdPanel.open(config);
    };

    function PanelDialogCtrlDemo($scope, mdPanelRef) {
        $scope.closeDialogDemo = function() {
            mdPanelRef.destroy();
        }
    }

    //  Open Menu
    $scope.DessertsPanelDemo = [
        'Apple Pie',
        'Donut',
        'Fudge',
        'Cupcake',
        'Ice Cream',
        'Tiramisu'
    ];
    $scope.selectedDessertPanelDemo = { favoriteDessert: 'Donut' };

    $scope.panelShowMenuDemo = function(ev) {
        var position = $mdPanel.newPanelPosition()
            .relativeTo('.demo-menu-open-button')
            .addPanelPosition($mdPanel.xPosition.ALIGN_START, $mdPanel.yPosition.BELOW);

        var config = {
            attachTo: angular.element(document.body),
            controller: PanelMenuCtrlDemo,
            controllerAs: 'ctrl',
            template: '<div class="demo-menu-example" ' +
                '     aria-label="Select your favorite dessert." ' +
                '     role="listbox">' +
                '  <div class="demo-menu-item" ' +
                '       ng-class="{selected : dessert == ctrl.selected.favoriteDessert}" ' +
                '       aria-selected="{{dessert == ctrl.selected.favoriteDessert}}" ' +
                '       tabindex="-1" ' +
                '       role="option" ' +
                '       ng-repeat="dessert in ctrl.desserts" ' +
                '       ng-click="ctrl.selectDessert(dessert)"' +
                '       >' +
                '    {{ dessert }} ' +
                '  </div>' +
                '</div>',
            panelClass: 'demo-menu-example',
            position: position,
            locals: {
                'selected': $scope.selectedDessertPanelDemo,
                'desserts': $scope.DessertsPanelDemo
            },
            openFrom: ev,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: false,
            zIndex: 2
        };
        $mdPanel.open(config);
    };

    function PanelMenuCtrlDemo(mdPanelRef) {
        this.desserts = $scope.DessertsPanelDemo;

        this.selected = { favoriteDessert: $scope.selectedDessertPanelDemo.favoriteDessert };
        this.selectDessert = function(dessert) {
            $scope.selectedDessertPanelDemo.favoriteDessert = dessert;
            mdPanelRef.destroy();
        }
    }

    // Panel Animations
    $scope.panelAnimationsDemo = {
        openFrom: 'button',
        closeTo: 'button',
        animationType: 'scale',
        duration: 300,
    };
    $scope.panelAnimationsDemoSeparateDurations = {
        open: $scope.panelAnimationsDemo.duration,
        close: $scope.panelAnimationsDemo.duration
    }


    $scope.panelAnimationsDialogDemo = function() {

        var position = $mdPanel.newPanelPosition()
            .absolute()
            .right()
            .top();

        var animation = $mdPanel.newPanelAnimation();

        animation.duration($scope.panelAnimationsDemo.duration || $scope.panelAnimationsDemoSeparateDurations);

        switch ($scope.panelAnimationsDemo.openFrom) {
            case 'button':
                animation.openFrom('.animation-target');
                break;
            case 'corner':
                animation.openFrom({ top: 0, left: 0 });
                break;
            case 'bottom':
                animation.openFrom({
                    top: document.documentElement.clientHeight,
                    left: document.documentElement.clientWidth / 2 - 250
                });
        }
        switch ($scope.panelAnimationsDemo.closeTo) {
            case 'button':
                animation.closeTo('.animation-target');
                break;
            case 'corner':
                animation.closeTo({ top: 0, left: 0 });
                break;
            case 'bottom':
                animation.closeTo({
                    top: document.documentElement.clientHeight,
                    left: document.documentElement.clientWidth / 2 - 250
                });
        }

        switch ($scope.panelAnimationsDemo.animationType) {
            case 'custom':
                animation.withAnimation({
                    open: 'demo-dialog-custom-animation-open',
                    close: 'demo-dialog-custom-animation-close'
                });
                break;
            case 'slide':
                animation.withAnimation($mdPanel.animation.SLIDE);
                break;
            case 'scale':
                animation.withAnimation($mdPanel.animation.SCALE);
                break;
            case 'fade':
                animation.withAnimation($mdPanel.animation.FADE);
                break;
            case 'none':
                animation = undefined;
                break;
        }

        var config = {
            animation: animation,
            attachTo: angular.element(document.body),
            controller: panelAnimationsDialogCtrl,
            controllerAs: 'ctrl',
            template: '<div role="dialog" aria-label="Eat me!" layout="column">' +
                '<md-toolbar>' +
                '<div class="md-toolbar-tools"><h2>Surprise!</h2></div>' +
                '</md-toolbar>' +
                '<div class="md-padding">' +
                '<p>You hit the secret button. Heres a donut:</p>' +
                '<div layout="row">' +
                '<img flex alt="Delicious donut" src="../../asset/images/donut.jpg" style="width:400px;height:200px">' +
                '</div>' +
                '</div>' +
                '<div layout="row" layout-align="center center">' +
                '<md-button md-autofocus class="md-primary" ng-click="ctrl.panelAnimationsDialogDemoClose()">Close</md-button>' +
                '</div>' +
                '</div>',
            panelClass: 'demo-dialog-example',
            position: position,
            trapFocus: true,
            zIndex: 150,
            clickOutsideToClose: true,
            clickEscapeToClose: true,
            hasBackdrop: true,
        };

        $mdPanel.open(config);
    };

    // Necessary to pass locals to the dialog template.
    function panelAnimationsDialogCtrl(mdPanelRef) {
        this.panelAnimationsDialogDemoClose = function() {
            mdPanelRef.close();
        };
    }

    /*//////////////////////////////End Panel Demo //////////////////////////////*/


}]);