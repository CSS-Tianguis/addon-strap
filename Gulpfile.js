var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin       = require('gulp-cssmin');
var rename       = require('gulp-rename');

gulp.task('sass', function () {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css/'));
});

gulp.task('autoprefixer', ['sass'], function() {
	return gulp.src('src/css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions','ie 8','ie 9','android 2.3','android 4','opera 12'],
			cascade: false
		}))
		.pipe(gulp.dest('src/css/build'))
});

gulp.task('cssmin', function() {
	return gulp.src('src/css/build/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/assets/css/'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
	gulp.watch('src/scss/**/*.scss', ['sass'])
	gulp.watch('src/css/*.css', ['autoprefixer'])
	gulp.watch('src/css/build/*.css', ['cssmin']);
});

gulp.task('default', ['watch']);