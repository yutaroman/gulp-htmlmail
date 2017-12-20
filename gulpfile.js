'use strict';
/**
 * プラグイン
 */
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var fs = require('fs');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

/**
 * 定数
 */
var PATH_DIST = 'dist';
var PATH_TEMP = 'temp';

var srcGlobs = {
  markup: 'src/*.html',
  style: 'src/css/*.scss',
  image: 'src/img/*.{jpg,png}'
}
var inlineCssOptions = {
  applyStyleTags: false,
  removeStyleTags: false
}
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
}
var plumberOptions = {
  errorHandler: function(error) {
    console.log(error.messageFormatted);
    this.emit('end');
  }
};

/**
 * 生成
 * $ build
 */
gulp.task('build:markup', function() {
  return gulp.src(srcGlobs.markup)
  .pipe($.plumber(plumberOptions))
  .pipe($.inlineCss(inlineCssOptions))
  .pipe(gulp.dest(PATH_DIST));
});
gulp.task('build:style', function() {
  return gulp.src(srcGlobs.style)
  .pipe($.plumber(plumberOptions))
  .pipe($.sass(sassOptions))
  .pipe(gulp.dest(PATH_TEMP));
});
gulp.task('build:image', function() {
  return gulp.src(srcGlobs.image)
  .pipe($.plumber(plumberOptions))
  .pipe(gulp.dest(PATH_DIST + '/img'));
});
gulp.task('build', function() {
  return runSequence('build:style', 'build:markup', 'build:image');
});

/**
 * ブラウザのオートリロード
 * $ reload
 */
gulp.task('reload', function() {
	return browserSync.reload();
});

/**
 * ローカルwebサーバーの起動
 * $ serve
 */
gulp.task('serve', function() {
  browserSync({
    host: 'localhost',
    port: 8000,
    server: {
      baseDir: PATH_DIST,
      directory: true
    }
  });
});

/**
 * サーバーアップロード
 * $ upload
 */
gulp.task('upload', function(){
  return gulp.src(PATH_DIST + '/img/*')
    .pipe($.sftp(JSON.parse(fs.readFileSync('.sftpconfig', 'utf8'))));
});

/**
 * 変更ファイルの監視
 * $ watch
 */
gulp.task('watch', ['serve'], function() {
  gulp.watch(srcGlobs.markup, function() {
    runSequence('build:markup', 'reload');
  });
  gulp.watch(srcGlobs.style, function() {
    runSequence('build:style','build:markup', 'reload');
  });
  gulp.watch(srcGlobs.image, function() {
    runSequence('build:image', 'upload', 'reload');
  });
});

/**
 * デフォルト
 * $ gulp
 */
gulp.task('default', [
  'build', 'watch'
]);
