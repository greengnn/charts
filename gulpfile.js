// 引入 gulp
var gulp = require('gulp');

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 处理用户的 js
gulp.task('js', function() {
    gulp.src('./src/*.js')
        .pipe(gulp.dest('./dist/src'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/src'));
});

// 处理用户的 html
gulp.task('html', function() {
    gulp.src('./src/example/*.html')
        .pipe(gulp.dest('./dist/example'));
});

// 合并 vendor js
gulp.task('VendorJs', function() {
    gulp.src(['./app/bower_components/jquery/dist/jquery.js',
            './app/bower_components/raphael/raphael.js'
        ])
        .pipe(gulp.dest('./dist/vendor'));
});

// 默认任务
gulp.task('default', function() {
    gulp.run('js', 'VendorJs', 'html');

    // 监听文件变化
    gulp.watch('./js/*.js', function() {
        gulp.run('lint', 'js');
    });
    gulp.watch('./app/bower_components/*', function() {
        gulp.run('VendorJs');
    });
});