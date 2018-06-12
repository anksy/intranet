'use strict';
const gulp = require('gulp'),
	map         = require('map-stream'),
    concat      = require('gulp-concat'),	
    pump        = require('pump'),
    uglify      = require('gulp-uglify'),
	stylish     = require('jshint-stylish'),
	nodemon     = require('gulp-nodemon'),
	cleancss    = require('gulp-clean-css'),
	jshint      = require('gulp-jshint');

//include front-end-gulp task
let front=require('./front-gulpfile');
    front.frontTask();
  
gulp.task('nodemon', () => {
    nodemon({
            tasks:  ['jshint'],
            script: 'server.js',
            ext: 'js html',
            ignore: ['public/','node_modules/', 'bower_components/','*.html','admin/dist/*'],
        })
        .on('restart', () => {
            console.log('server restarted ...');
        });
});

var exitOnJshintError = map( (file, cb) => {
  if (!file.jshint.success) {
    console.error('fix error first! jshint stopped');
    process.exit(1);
  }
});

gulp.task('jshint', ['minify-internal-js-admin', 'minify-internal-css-admin'], () => {
    return gulp.src([       
            './admin/backend/*.js',
            './admin/backend/*/*.js',
            './admin/backend/*/*/*.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(exitOnJshintError);
});

/* minify internal javascript code for admin*/
gulp.task('minify-internal-js-admin', (cb) => {
    pump([
        gulp.src([
            './admin/backend/app.js',
            './admin/backend/config.js',
            './admin/backend/routes.js',
            './admin/backend/sideNavbar.js',
            './admin/backend/factories/*.js',

            './admin/backend/*/controllers/*.js',
            './admin/backend/*/*/controllers/*.js',
            './admin/backend/*/*/controllers/*/*.js',          
            './admin/backend/directives/*.js',
            './admin/backend/filters/*.js',
        ]),
        concat('admin_app.min.js'),
        uglify(),
        gulp.dest('admin/dist/js'),
    ], cb);
});


gulp.task('minify-external-jquery-admin', (cb) => {
    pump([
        gulp.src([

            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/bootstrap/dist/js/bootstrap.min.js',
            './bower_components/morris.js/morris.min.js',
            './bower_components/raphael/raphael.min.js',
            './bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.js',
            './bower_components/amcharts3/amcharts/amcharts.js',
            './bower_components/amcharts3/amcharts/serial.js',

            //custom admin theme
            // './admin/assets/js/app.js',
            // './admin/assets/js/layout.js',
            
        ]),
        concat('admin_site_jquery_.min.js'),
        uglify({output:{beautify: false}}),
        gulp.dest('admin/dist/js'),
    ], cb);
});

gulp.task('minify-external-javascript-admin', (cb) => {
    pump([
        gulp.src([

            './bower_components/angular/angular.min.js',
            './bower_components/angular-animate/angular-animate.min.js',
            './bower_components/angular-aria/angular-aria.min.js',
            './bower_components/angular-messages/angular-messages.min.js',
            './bower_components/angular-material/angular-material.min.js',
            './bower_components/angular-route/angular-route.min.js',
            './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './bower_components/angular-cookies/angular-cookies.min.js',
            './bower_components/ng-file-upload/ng-file-upload.min.js',
            './bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
            './bower_components/angular-loading-bar/src/loading-bar.js',
            './bower_components/angular-material-data-table/dist/md-data-table.min.js',
            './bower_components/angular-local-storage/dist/angular-local-storage.min.js',
            './bower_components/summernote/dist/summernote.min.js',
            './bower_components/angular-summernote/src/angular-summernote.js',
            './bower_components/angular-slimscroll-aiska/angular-slimscroll-aiska.min.js',
            './bower_components/moment/min/moment.min.js',
            './public/assets/socket/socket.io.js',
            
            './admin/assets/js/app.js',
            './admin/assets/js/layout.js',
            './admin/assets/js/layout.js',
            './admin/assets/js/dashboard.min.js'
            
            
        ]),
        concat('admin_site.min.js'),
        uglify({output:{beautify: false, max_line_len:60000}}),
        gulp.dest('admin/dist/js'),
    ], cb);
});


/*minify external css for admin*/
gulp.task('minify-external-css-admin', () => {
    gulp.src([
        './bower_components/angular-material/angular-material.min.css',
        './bower_components/ng-img-crop/compile/minified/ng-img-crop.css',
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/font-awesome/css/font-awesome.css',
        './bower_components/angular-loading-bar/src/loading-bar.css',
        './bower_components/angular-material-data-table/dist/md-data-table.min.css',
        './bower_components/summernote/dist/summernote.css',
        './bower_components/morris.js/morris.css'
      
    ])
    .pipe(concat('admin_site.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('admin/dist/css'));
});

/*minify internal css for admin*/
gulp.task('minify-internal-css-admin', () => {
    gulp.src([
            'admin/assets/css/components-md.css',
          
            'admin/assets/css/theme/layout.css',
            'admin/assets/css/theme/default.css',
            'admin/assets/css/theme/custom.css',
            'admin/assets/css/login-3.css',
            'admin/assets/css/profile.css',
            'admin/assets/css/simple-line-icons.css',
            // 'admin/assets/css/plugins-md.min.css',
    ])
    .pipe(concat('admin_app.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('admin/dist/css'));
});

gulp.task('default', [
        'nodemon',
        'jshint',
        'minify-internal-js-admin', 
       // 'minify-external-css-admin',
       // 'minify-internal-css-admin',
     ], () => {
    console.log("gulp tasks completed");
});

/*Admin Build for External Javascript*/
gulp.task('admin.build', [
     'minify-external-javascript-admin',
     'minify-external-css-admin',
     'minify-external-jquery-admin'

    ], () => {
    console.log("Admin Build for External Javascript - Completed");
});

/*gulp.watch(['admin/assets/css/*.css','admin/assets/css/theme/*.css'],
    ['minify-internal-css-admin']);*/