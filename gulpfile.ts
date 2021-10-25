import gulp from 'gulp';

var postcss = require('gulp-postcss'),
    sass = require('gulp-sass')(require('sass'));

var paths = {
    styles: {
        src: './src/css/**/*.css',
        dest: './dist/css/'
    }
};

/*------------------------------------------------------*/
/* STYLES TASKS ----------------------------------------*/
/*------------------------------------------------------*/
// Compile custom CSS and copy to dist/css
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(postcss())
        .pipe(gulp.dest(paths.styles.dest));
};

exports.styles = styles;
