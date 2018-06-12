'use strict';

app.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'backend/dashboard/views/dashboard.html',
                controller: 'DashboardController',
                resolve: {
                    validate: required
                }
            })
            .when('/login', {
                templateUrl: 'backend/landing/views/admin_login.html',
                controller: 'authController',
                resolve: {
                    validate: notRequired
                }

            })
            .when('/reset-password', {
                templateUrl: 'backend/landing/views/reset.html',
                controller: 'authController',
                resolve: {
                    validate: notRequired
                }
            })          
            .when('/profile', {
                templateUrl: 'backend/profile/views/profile.html',
                controller: 'ProfileController',
                resolve: {
                    validate: required
                }
            })
            .when('/settings', {
                templateUrl: 'backend/settings/views/index.html',
                controller: 'SettingController',
                resolve: {
                    validate: required
                },
                accessLevel:[1]
            })

            .when('/settings', {
                templateUrl: 'backend/settings/views/index.html',
                controller: 'SettingController',
                resolve: {
                    validate: required
                },
                accessLevel:[1]
            })

            .when('/settings/site-config', {
                templateUrl: 'backend/settings/views/conf.html',
                controller: 'SettingController',
                resolve: {
                    validate: required
                },
                accessLevel:[1]
            })

            /*Manage Backend Users*/
            .when('/managers', {
                templateUrl: 'backend/managers/views/index.html',
                controller: 'ManagerController',
                resolve: {
                    validate: required
                },
                accessLevel:[1]
            })
            .when('/managers/add', {
                templateUrl: 'backend/managers/views/add.html',
                controller: 'ManagerController',
                resolve: {
                    validate: required
                },
                accessLevel:[1]
            })
            .when('/managers/edit/:manager_id', {
                templateUrl: 'backend/managers/views/edit.html',
                controller: 'EditManagerController',
                resolve: {
                    validate: required
                },
                accessLevel:[1]
            })
            /*CMS Pages*/
            .when('/pages', {
                templateUrl: 'backend/pages/views/index.html',
                controller: 'PageController',
                resolve: {
                    validate: required
                }
            })
            .when('/pages/add', {
                templateUrl: 'backend/pages/views/add.html',
                controller: 'AddPageController',
                resolve: {
                    validate: required
                }
            })
            .when('/pages/edit/:post_id', {
                templateUrl: 'backend/pages/views/edit.html',
                controller: 'EditPageController',
                resolve: {
                    validate: required
                }
            })
            /*Social Links*/
            .when('/links', {
                templateUrl: 'backend/links/views/index.html',
                controller: 'LinkController',
                resolve: {
                    validate: required
                }
            })
            .when('/links/add', {
                templateUrl: 'backend/links/views/add.html',
                controller: 'AddLinkController',
                resolve: {
                    validate: required
                }
            })
            .when('/links/edit/:post_id', {
                templateUrl: 'backend/links/views/edit.html',
                controller: 'EditLinkController',
                resolve: {
                    validate: required
                }
            })
            /*Slider*/
            .when('/slider', {
                templateUrl: 'backend/slider/views/index.html',
                controller: 'SliderController',
                resolve: {
                    validate: required
                }
            })
            .when('/slider/add', {
                templateUrl: 'backend/slider/views/add.html',
                controller: 'AddSliderController',
                resolve: {
                    validate: required
                }
            })
            .when('/slider/edit/:post_id', {
                templateUrl: 'backend/slider/views/edit.html',
                controller: 'EditSliderController',
                resolve: {
                    validate: required
                }
            })
            /*Blogs*/
            .when('/blogs', {
                templateUrl: 'backend/blogs/views/index.html',
                controller: 'BlogController',
                resolve: {
                    validate: required
                }
            })
            .when('/blogs/add', {
                templateUrl: 'backend/blogs/views/add.html',
                controller: 'AddBlogController',
                resolve: {
                    validate: required
                }
            })
            .when('/blogs/edit/:post_id', {
                templateUrl: 'backend/blogs/views/edit.html',
                controller: 'EditBlogController',
                resolve: {
                    validate: required
                }
            })
            /*Benefits*/
            .when('/benefits', {
                templateUrl: 'backend/benefits/views/index.html',
                controller: 'BenefitController',
                resolve: {
                    validate: required
                }
            })
            .when('/benefits/add', {
                templateUrl: 'backend/benefits/views/add.html',
                controller: 'AddBenefitController',
                resolve: {
                    validate: required
                }
            })
            .when('/benefits/edit/:post_id', {
                templateUrl: 'backend/benefits/views/edit.html',
                controller: 'EditBenefitController',
                resolve: {
                    validate: required
                }
            })
            /*CMS Block*/
            .when('/blocks', {
                templateUrl: 'backend/blocks/views/index.html',
                controller: 'BlockController',
                resolve: {
                    validate: required
                }
            })
            .when('/blocks/add', {
                templateUrl: 'backend/blocks/views/add.html',
                controller: 'AddBlockController',
                resolve: {
                    validate: required
                }
            })
            .when('/blocks/edit/:post_id', {
                templateUrl: 'backend/blocks/views/edit.html',
                controller: 'EditBlockController',
                resolve: {
                    validate: required
                }
            })
            /*Testimonial*/
            .when('/testimonials', {
                templateUrl: 'backend/testimonials/views/index.html',
                controller: 'TestimonialController',
                resolve: {
                    validate: required
                }
            })
            .when('/testimonials/add', {
                templateUrl: 'backend/testimonials/views/add.html',
                controller: 'AddTestimonialController',
                resolve: {
                    validate: required
                }
            })
            .when('/testimonials/edit/:post_id', {
                templateUrl: 'backend/testimonials/views/edit.html',
                controller: 'EditTestimonialController',
                resolve: {
                    validate: required
                }
            })
            /*Community*/
            .when('/community', {
                templateUrl: 'backend/community/views/index.html',
                controller: 'CommunityController',
                resolve: {
                    validate: required
                }
            })
            .when('/community/add', {
                templateUrl: 'backend/community/views/add.html',
                controller: 'AddCommunityController',
                resolve: {
                    validate: required
                }
            })
            .when('/community/edit/:post_id', {
                templateUrl: 'backend/community/views/edit.html',
                controller: 'EditCommunityController',
                resolve: {
                    validate: required
                }
            })
            /*Jobs*/
            .when('/jobs', {
                templateUrl: 'backend/jobs/views/index.html',
                controller: 'JobsController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            .when('/jobs/details/:id', {
                templateUrl: 'backend/jobs/views/details.html',
                controller: 'JobsController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            /*Payments*/
            .when('/payments', {
                templateUrl: 'backend/payments/views/index.html',
                controller: 'PaymentController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            .when('/payments/details/:id', {
                templateUrl: 'backend/payments/views/details.html',
                controller: 'PaymentController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            /*Jobs Category*/
            .when('/jobs/category', {
                templateUrl: 'backend/jobs/category/views/index.html',
                controller: 'JobController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            .when('/jobs/category/add', {
                templateUrl: 'backend/jobs/category/views/add.html',
                controller: 'AddJobController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            .when('/jobs/category/edit/:post_id', {
                templateUrl: 'backend/jobs/category/views/edit.html',
                controller: 'EditJobController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            .when('/jobs/category/sub-category/:post_id', {
                templateUrl: 'backend/jobs/category/views/sub_category.html',
                controller: 'EditJobController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            /*Feedback*/
            .when('/feedbacks', {
                templateUrl: 'backend/feedback/views/index.html',
                controller: 'FeedbackController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            .when('/feedbacks/view/:id', {
                templateUrl: 'backend/feedback/views/view.html',
                controller: 'FeedbackController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            /*FAQs*/
            .when('/faq', {
                templateUrl: 'backend/faq/views/index.html',
                controller: 'FaqController',
                resolve: {
                    validate: required
                }
            })
            .when('/faq/add', {
                templateUrl: 'backend/faq/views/add.html',
                controller: 'AddFaqController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            .when('/faq/edit/:post_id', {
                templateUrl: 'backend/faq/views/edit.html',
                controller: 'EditFaqController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            /*Web Users*/
            .when('/web-users', {
                templateUrl: 'backend/webusers/views/index.html',
                controller: 'WebUserController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            /*AppUsers*/
            .when('/app-users', {
                templateUrl: 'backend/appusers/views/index.html',
                controller: 'AppUserController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            .when('/user/add', {
                templateUrl: 'backend/webusers/views/addUser.html',
                controller: 'WebUserController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            .when('/user/details/:id', {
                templateUrl: 'backend/webusers/views/details.html',
                controller: 'WebUserController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            /*Reports & Data*/
            /*.when('/export/jobs', {
                templateUrl: 'backend/export/views/jobs.html',
                controller: 'ExportController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })*/

            .when('/export/:id', {
                templateUrl: 'backend/export/views/export-result.html',
                controller: 'ExportController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
           .when('/sitemap', {
                templateUrl: 'backend/sitemap/views/index.html',
                controller: 'SitemapController',
                resolve: {
                    validate: required
                }
            })
            .when('/sitemap/add', {
                templateUrl: 'backend/sitemap/views/add.html',
                controller: 'AddSitemapController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            .when('/sitemap/edit/:post_id', {
                templateUrl: 'backend/sitemap/views/edit.html',
                controller: 'EditSitemapController',
                resolve: {
                    validate: required
                },
                accessLevel:[1,2]
            })
            

            .otherwise({
                redirectTo: '/'
            });

            // $locationProvider.html5Mode(true);
    }]);


var required = ['$q','localStorageService', function  ($q,localStorageService) {
    
    var deferred = $q.defer();
    var token =localStorageService.cookie.get("user");
    token=token.token;

  
    if (token) {
        deferred.resolve();
    } else {
        deferred.reject({
            authentication: false
        });
    }
    return deferred.promise;
}];

var notRequired = ['$q', function  ($q) {
    var deferred = $q.defer();
    var token = localStorage.getItem("token");
    if (token) {
        deferred.reject({
            authentication: true
        });
    } else {
        deferred.resolve();
    }
    return deferred.promise;
}];