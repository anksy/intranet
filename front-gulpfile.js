'use strict';

const gulp      = require('gulp'),
    jshint      = require('gulp-jshint'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    cleancss    = require('gulp-clean-css'),
    pump        = require('pump'),
    babel       = require('gulp-babel'),
    stylish     = require('jshint-stylish'),
    browserSync = require('browser-sync'),
    fs          = require('fs');

exports.frontTask = function(){

const watchFiles =[
    './public/assets/css/custom.css',
    './public/app/global.js',
    './public/app/env.js',
    './public/app/API_PATH.js',
    './public/app/config.js',
    './public/app/app.js',
    './public/app/routes.js',
    './public/app/directives.js',
    './public/app/services.js',
    './public/app/routeChange.js',
    './public/app/routes.js',
    './public/components/*/*.js',
    './public/components/*/*/*.js',
    './public/components/*/*/*.js',

    './public/components/*/directives/*.js',
    
    './public/components/*/controller/*.js',
    './public/components/*/routes/*.js',
    './public/components/*/*/routes/*.js'
];

const appFiles =[
    './public/app/global.js',
    './public/app/env.js',
    './public/app/API_PATH.js',
    './public/app/config.js',
    './public/app/app.js',
    './public/app/routes.js',
    './public/app/directives.js',
    './public/app/services.js',
    './public/app/routeChange.js',
    './public/app/routes.js',
    './public/components/*/*.js',
    './public/components/*/*/*.js',
    './public/components/*/*/*.js',
    './public/components/*/controller/*.js',
    './public/components/*/routes/*.js',
    './public/components/*/*/routes/*.js'
];

/*
    task for compress all css bowers css
*/

gulp.task('vendor:cssmin', () => {
    gulp.src([
        //css file path
        './bower_components/angular-material/angular-material.min.css',
        './bower_components/bootstrap/dist/css/bootstrap.min.css',
        './bower_components/angular-material-data-table/dist/md-data-table.min.css'
        
    ])
    .pipe(concat('vendor.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('./public/assets/dist/css/'));
});

gulp.task('bundle:cssmin', () => {
    gulp.src([
        './public/assets/css/app.css',
        './public/assets/css/grid.css',
        './public/assets/css/theme.css',
        './public/assets/css/custom.css',
    ])
    .pipe(concat('app.min.css'))
    .pipe(cleancss({compatibility: 'ie8', processImport: false}))
    .pipe(gulp.dest('./public/assets/dist/css/'))
    .pipe(browserSync.stream());
});
/*
    Gulp task for minify vendor js files
*/

gulp.task('vendor:uglify', (cb) => {
    pump([
        gulp.src([
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/angular/angular.min.js',
            './bower_components/angular-animate/angular-animate.min.js',
            './bower_components/angular-aria/angular-aria.min.js',
            './bower_components/angular-messages/angular-messages.js',
            './bower_components/angular-ui-router/release/angular-ui-router.min.js',
            './bower_components/angular-ui-router.stateHelper/statehelper.min.js',
            './bower_components/angular-material/angular-material.min.js',
            './bower_components/angular-local-storage/dist/angular-local-storage.min.js',
            './bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
            './bower_components/ng-file-upload/ng-file-upload-all.js',
            './bower_components/angular-google-chart/ng-google-chart.js',
            './bower_components/angular-sanitize/angular-sanitize.min.js',
            './bower_components/angular-material-data-table/dist/md-data-table.min.js',
            './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
            
        ]),
        concat('vendor.js'),
        uglify({output:{beautify: false, max_line_len:80000}}),
        gulp.dest('public/assets/dist/js/')
    ],cb);

});

/*
    minify external Js files for  admin-end
*/

gulp.task('bundle:uglify', (cb) => {
    pump([
        
        gulp.src(appFiles),
        jshint(),
        babel({  presets: ['es2015']}),
        concat('bundle.min.js'),
        gulp.dest('public/assets/dist/js/'),
        browserSync.stream(),
    ],cb);

});

gulp.task('bundle-min:uglify', (cb) => {
    pump([
        gulp.src(appFiles),
        jshint(),
        babel({  presets: ['es2015']}),
        concat('bundle.js'),
        uglify({output:{beautify: false, max_line_len:50000}}),
        gulp.dest('public/assets/dist/js/')
    ],cb);

});
/*
gulp build for vendor library 
*/

gulp.task('app-build',[            
    'vendor:cssmin',
    'vendor-jquery:uglify',
    'vendor:uglify',
    'bundle-min:uglify'
]);
/*
    gulp default task
*/


gulp.task('app', [
    'bundle:uglify',
    'bundle:cssmin',
    'watch:front'
], function() {
    console.log("gulp all tasks finished");
});

/*
    gulp watch automatically build files when changes are done js or css
*/

gulp.task('jshint-app',['bundle:uglify'],function(){
    gulp.src(appFiles) 
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('watch:front',function(){
    gulp.watch(watchFiles,
        ['bundle:uglify','jshint-app', 'bundle:cssmin'], 
        function() {
        console.log("gulp all tasks finished");
        });
    });

};