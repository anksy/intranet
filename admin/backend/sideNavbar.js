'use strict';

app.run(['$rootScope', function($rootScope){

	$rootScope.sidenav= [
			{
				title : "Dashboard",
				class : "nav-item start",
				icon  : "icon-home",
				link  : "/",
				accessLevel:[1,2,3]
			},
			{
				title : "User Management",
				class : "heading",
				accessLevel:[1,2]
			},
			{
				title : "Web Users",
				class : "nav-item start",
				icon  : "icon-user",
				link  : "/web-users",
				accessLevel:[1,2]
			},
			{
				title : "App Users",
				class : "nav-item start",
				icon  : "icon-user",
				link  : "/app-users",
				accessLevel:[1,2]
			},
			/*{
				title : "Add User",
				class : "nav-item start",
				icon  : "icon-plus",
				link  : "/user/add",
				accessLevel:[1,2]
			},*/
			{
				title : "Jobs",
				class : "heading",
				accessLevel:[1,2]
			},
			{
				title : "Jobs",
				class : "nav-item start",
				icon  : "icon-briefcase",
				link  : "jobs",
				accessLevel:[1,2]
			},
			/*{
				title : "Category",
				class : "nav-item start",
				icon  : "icon-bar-chart",
				link  : "jobs/category",
				accessLevel:[1,2]
			},*/
			{
				title : "Payments",
				class : "nav-item start",
				icon  : "icon-wallet",
				link  : "payments",
				accessLevel:[1,2]
			},
			{
				title : "CMS",
				class : "heading"
			},
			{
				title : "Pages",
				class : "nav-item start",
				icon  : "icon-notebook",
				children : [
					{
						title : "List Pages",
						link  : "pages",
						accessLevel:[1,2]
					},
					{
						title : "Add Page",
						link  : "pages/add",
						accessLevel:[1,2]
					}
				]
			},
			{
				title : "Blogs",
				class : "nav-item start",
				icon  : "icon-diamond",
				children : [
					{
						title : "List Blogs",
						link  : "blogs",
						accessLevel:[1,2]
					},
					{
						title : "Add Blog",
						link  : "blogs/add",
						accessLevel:[1,2]
					}
				]
			},
			{
				title : "Benefits",
				class : "nav-item start",
				icon  : "icon-plus",
				children : [
					{
						title : "List Benefits",
						link  : "benefits",
						accessLevel:[1,2]
					},
					{
						title : "Add Benefit",
						link  : "benefits/add",
						accessLevel:[1,2]
					}
				]
			},
			{
				title : "CMS Block",
				class : "nav-item start",
				icon  : "icon-diamond",
				children : [
					{
						title : "List CMS Block",
						link  : "blocks",
						accessLevel:[1,2]
					},
					{
						title : "Add CMS Block",
						link  : "blocks/add",
						accessLevel:[1,2]
					}
				]
			},
			{
				title : "FAQs",
				class : "nav-item start",
				icon  : "icon-question",
				link  : "faq"
			},
			{
				title : "Testimonials",
				class : "nav-item start",
				icon  : "icon-diamond",
				children : [
					{
						title : "List Testimonials",
						link  : "testimonials",
						accessLevel:[1,2]
					},
					{
						title : "Add Testimonial",
						link  : "testimonials/add",
						accessLevel:[1,2]
					}
				]
			},
			{
				title : "Slider",
				class : "nav-item start",
				icon  : "icon-picture",
				children : [
					{
						title : "List Slides",
						link  : "slider",
						accessLevel:[1,2]
					},
					{
						title : "Add Slide",
						link  : "slider/add",
						accessLevel:[1,2]
					}
				]
			},
			{
				title : "Our Community",
				class : "nav-item start",
				icon  : "icon-social-dribbble",
				children : [
					{
						title : "List Community",
						link  : "community",
						accessLevel:[1,2]
					},
					{
						title : "Add Community",
						link  : "community/add",
						accessLevel:[1,2]
					}
				]
			},
			{
				title : "Social Links",
				class : "nav-item start",
				icon  : "icon-social-facebook",
				children : [
					{
						title : "List Links",
						link  : "links",
						accessLevel:[1,2]
					},
					{
						title : "Add Link",
						link  : "links/add",
						accessLevel:[1,2]
					}
				]
			},
			{
				title : "Admin Users",
				class : "heading",
				accessLevel:[1,2]
			},
			{
				title : "All Users",
				class : "nav-item start",
				icon  : "icon-user",
				link  : "/managers",
				accessLevel:[1,2]
			},
			{
				title : "Add User",
				class : "nav-item start",
				icon  : "icon-user",
				link  : "/managers/add",
				accessLevel:[1,2]
			},
			{
				title : "Your Profile",
				class : "nav-item start",
				icon  : "icon-user",
				link  : "/profile",
				accessLevel:[1,2]
			},
			{
				title : "Tools",
				class : "heading",
				accessLevel:[1,2]
			},
			{
				title : "Export",
				class : "nav-item start",
				icon  : "icon-user",
				accessLevel:[1,2],
				children : [
					{
						title : "Jobs",
						link  : "/export/jobs",
						accessLevel:[1,2]
					},
					/*{
						title : "Payments",
						link  : "/",
						accessLevel:[1,2]
					}*/
				]
			},
			{
				title : "Settings",
				class : "heading",
				accessLevel:[1,2]
			},
			{
				title : "General",
				class : "nav-item start",
				icon  : "icon-settings",
				link  : "/settings",
				accessLevel:[1,2]
			},
			{
				title : "Application Config",
				class : "nav-item start",
				icon  : "icon-settings",
				link  : "/settings/site-config",
				accessLevel:[1,2]
			},
			{
				title : "Misc",
				class : "heading",
				accessLevel:[1,2]
			},
			{
				title : "Feedbacks & Queries",
				class : "nav-item start",
				icon  : "icon-bubble",
				link  : "/feedbacks",
				accessLevel:[1,2]
			},
			{
				title : "Sitemap",
				class : "nav-item start",
				icon  : "icon-bubble",
				link  : "/sitemap",
				accessLevel:[1,2]
			}
		];
}]);