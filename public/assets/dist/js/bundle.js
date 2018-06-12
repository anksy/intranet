/* ///////////////////////////   ConsoleBox app js ///////////////////////////////// */

'use strict';

/********************************** Module description ************************  

ngMaterial- Angular Material
ngAnimate- Angularjs Animation
ngAria-  Angularjs ARIA attributes
ngMessages- Angularjs ngMessages(The ngMessages module provides enhanced support for displaying messages within templates).
ngRoute- Angularjs Routing
ui.router- Third party routing module
ui.router.state.events- Detect tui routing state
ngPrism - Prism syntax highlighter
cl.paging - Pagination
ngCollapsible - Collapsible Ui Element
ngOwlcarousel- Owl Carousel
ngecharts- Echart charting plugin
chart.js- chartjs charting plugin
googlechart - Google chart plugin
ngValidate - Form Validation plugin
cleave.js - Form mask plugin
ngQuill - Quill text Editor
lfNgMdFileInput - File Upload plugin
md.data.table-  Data Table plugin

***************************************** End Module description ***********************/

/********************************** Service description ************************  

$mdThemingProvider- Theme provider in ngMaterial
$stateProvider- State provider in ui.router
$urlRouterProvider-  url router provider in ngRoute

***************************************** End Service description ***********************/

// initialize app

angular.module('intranet', ['ngMaterial', 'ngAnimate', 'ngAria', 'ngMessages', 'ui.router']).run(['$rootScope', function ($rootScope) {

    /* initialize valiable */
    $rootScope.themeColor = 'indigo';
    // Theme color

    //left sidebar ripple color
    $rootScope.leftSidebarMenuRipple = "#000";
    //toolbar ripple color
    $rootScope.toolbarMenuRipple = "#312e2e";
    // theme default option value
    $rootScope.themeOptions = "fixed-sidebar fixed-toolbar";

    // tooltip for collapsed sidebar
    $rootScope.collapsedTooltipText = "Collapsed";
    $rootScope.showTooltipForCollapsed = "hide-collapsed-ls-tooltip";

    $rootScope.islogin = false;
}])

// initialize configuration
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    'use strict';
    // configure routing

    $stateProvider.state('/', {
        url: "/dashboard",
        templateUrl: './files/dashboard.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "dashboard",
                    description = "dashboard";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('buttons', {
        url: "/buttons",
        templateUrl: './files/buttons.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "buttons",
                    description = "buttons";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('breadcrumbs', {
        url: "/breadcrumbs",
        templateUrl: './files/breadcrumbs.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "breadcrumbs",
                    description = "breadcrumbs";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('collections', {
        url: "/collections",
        templateUrl: './files/collections.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "collections",
                    description = "collections";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('collapsibles', {
        url: "/collapsibles",
        templateUrl: './files/collapsibles.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "collapsibles",
                    description = "collapsibles";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('menu', {
        url: "/menu",
        templateUrl: './files/menu.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "menu",
                    description = "menu";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('tabs', {
        url: "/tabs",
        templateUrl: './files/tabs.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "tabs",
                    description = "tabs";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('progressCircular', {
        url: "/progressCircular",
        templateUrl: './files/progressCircular.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "progressCircular",
                    description = "progressCircular";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('progressLinear', {
        url: "/progressLinear",
        templateUrl: './files/progressLinear.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "progressLinear",
                    description = "progressLinear";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('toasts', {
        url: "/toasts",
        templateUrl: './files/toasts.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "toasts",
                    description = "toasts";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('tooltip', {
        url: "/tooltip",
        templateUrl: './files/tooltip.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "tooltip",
                    description = "tooltip";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('ripple', {
        url: "/ripple",
        templateUrl: './files/ripple.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "ripple",
                    description = "ripple";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('pagination', {
        url: "/pagination",
        templateUrl: './files/pagination.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "pagination",
                    description = "pagination";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('typography', {
        url: "/typography",
        templateUrl: './files/typography.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "typography",
                    description = "typography";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('icons', {
        url: "/icons",
        templateUrl: './files/icons.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "icons",
                    description = "icons";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('whiteframe', {
        url: "/whiteframe",
        templateUrl: './files/whiteframe.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "whiteframe",
                    description = "whiteframe";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('animations', {
        url: "/animations",
        templateUrl: './files/animations.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "animations",
                    description = "animations";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('media', {
        url: "/media",
        templateUrl: './files/media.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "media",
                    description = "media";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('cards', {
        url: "/cards",
        templateUrl: './files/cards.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "cards",
                    description = "cards";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('dialog', {
        url: "/dialog",
        templateUrl: './files/dialog.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "dialog",
                    description = "dialog";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('carousel', {
        url: "/carousel",
        templateUrl: './files/carousel.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "carousel",
                    description = "carousel";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('slider', {
        url: "/slider",
        templateUrl: './files/slider.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "slider",
                    description = "slider";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('sweetAlert', {
        url: "/sweetAlert",
        templateUrl: './files/sweetAlert.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "sweetAlert",
                    description = "sweetAlert";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('highlight', {
        url: "/highlight",
        templateUrl: './files/highlight.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "highlight",
                    description = "highlight";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('echarts', {
        url: "/echarts",
        templateUrl: './files/echarts.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "echarts",
                    description = "echarts";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('chartjs', {
        url: "/chartjs",
        templateUrl: './files/chartjs.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "chartjs",
                    description = "chartjs";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('google-charts', {
        url: "/google-charts",
        templateUrl: './files/google-charts.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "google charts",
                    description = "google charts";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('form-layouts', {
        url: "/form-layouts",
        templateUrl: './files/form-layouts.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "form layouts",
                    description = "form layouts";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('form-validations', {
        url: "/form-validations",
        templateUrl: './files/form-validations.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "form validations",
                    description = "form validations";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('form-masks', {
        url: "/form-masks",
        templateUrl: './files/form-masks.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "form masks",
                    description = "form masks";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('text-editor', {
        url: "/text-editor",
        templateUrl: './files/text-editor.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "text editor",
                    description = "text editor";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('autocomplete', {
        url: "/autocomplete",
        templateUrl: './files/autocomplete.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "autocomplete",
                    description = "autocomplete";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('checkbox', {
        url: "/checkbox",
        templateUrl: './files/checkbox.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "checkbox",
                    description = "checkbox";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('chips', {
        url: "/chips",
        templateUrl: './files/chips.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "chips",
                    description = "chips";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('datepicker', {
        url: "/datepicker",
        templateUrl: './files/datepicker.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "datepicker",
                    description = "datepicker";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('file-input', {
        url: "/file-input",
        templateUrl: './files/file-input.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "file input",
                    description = "file input";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('radio-button', {
        url: "/radio-button",
        templateUrl: './files/radio-button.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "radio button",
                    description = "radio button";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('switch', {
        url: "/switch",
        templateUrl: './files/switch.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "switch",
                    description = "switch";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('select', {
        url: "/select",
        templateUrl: './files/select.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "select",
                    description = "select";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('basic-table', {
        url: "/basic-table",
        templateUrl: './files/basic-table.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "basic table",
                    description = "basic table";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('data-table', {
        url: "/data-table",
        templateUrl: './files/data-table.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "data table",
                    description = "data table";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('bottomSheet', {
        url: "/bottomSheet",
        templateUrl: './files/bottomSheet.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "Bottom Sheet",
                    description = "Bottom Sheet";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('fabSpeedDial', {
        url: "/fabSpeedDial",
        templateUrl: './files/fabSpeedDial.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "fab SpeedDial",
                    description = "fab SpeedDial";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('fabToolbar', {
        url: "/fabToolbar",
        templateUrl: './files/fabToolbar.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "FAB Toolbar",
                    description = "FAB Toolbar";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('list', {
        url: "/list",
        templateUrl: './files/list.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "list",
                    description = "list";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('menuBar', {
        url: "/menuBar",
        templateUrl: './files/menuBar.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "menuBar",
                    description = "menuBar";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('navBar', {
        url: "/navBar",
        templateUrl: './files/navBar.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "navBar",
                    description = "navBar";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('subheader', {
        url: "/subheader",
        templateUrl: './files/subheader.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "subheader",
                    description = "subheader";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('swipe', {
        url: "/swipe",
        templateUrl: './files/swipe.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "swipe",
                    description = "swipe";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('toolbar', {
        url: "/toolbar",
        templateUrl: './files/toolbar.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "toolbar",
                    description = "toolbar";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('virtualRepeat', {
        url: "/virtualRepeat",
        templateUrl: './files/virtualRepeat.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "virtualRepeat",
                    description = "virtualRepeat";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('panel', {
        url: "/panel",
        templateUrl: './files/panel.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "panel",
                    description = "panel";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('color', {
        url: "/color",
        templateUrl: './files/color.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "color",
                    description = "color";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('helpers', {
        url: "/helpers",
        templateUrl: './files/helpers.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "helpers",
                    description = "helpers";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('grid', {
        url: "/grid",
        templateUrl: './files/grid.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "grid",
                    description = "grid";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('404-admin', {
        url: "/404-admin",
        templateUrl: './files/404-admin.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "404",
                    description = "404";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('500-admin', {
        url: "/500-admin",
        templateUrl: './files/500-admin.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "500",
                    description = "500";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('login', {
        url: "/login",
        templateUrl: './files/frontend/login.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "Login",
                    description = "Login";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    }).state('blank', {
        url: "/blank",
        templateUrl: './files/blank.html',
        resolve: {
            themeMeta: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
                var title = "blank",
                    description = "blank";
                $rootScope.themeMeta = { title: title, description: description };
            }]
        }
    });
    $urlRouterProvider.otherwise('/404-admin');
}]);