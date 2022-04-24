import gulp from 'gulp';

var postcss = require('gulp-postcss'),
    postcssImport = require('postcss-import'),
    tailwind = require('tailwindcss');

var paths = {
    styles: {
        src: './src/css/styles.css',
        dest: './dist/css/'
    }
};

/*------------------------------------------------------*/
/* STYLES TASKS ----------------------------------------*/
/*------------------------------------------------------*/
// Compile custom CSS and copy to dist/css
function styles() {
    return gulp.src(paths.styles.src, { sourcemaps: true })
        .pipe(postcss())
        .pipe(gulp.dest(paths.styles.dest), { sourcemaps: '.' });
};

exports.styles = styles;
