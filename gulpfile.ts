import gulp from 'gulp';

var notify          = require('gulp-notify'),
    paths           = require('./project-paths.json'),
    postcss         = require('gulp-postcss'),
    rename          = require('gulp-rename');

/*------------------------------------------------------*/
/* INIT TASKS ------------------------------------------*/
/*------------------------------------------------------*/
// Copy fonts from src/fonts to dist/fonts
function fontsInit() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(notify({message: '<%= file.relative %> distributed!', title : 'fontsInit'}));
}
/*------------------------------------------------------*/
/* END INIT TASKS --------------------------------------*/
/*------------------------------------------------------*/
  
  
/*------------------------------------------------------*/
/* STYLES TASKS ----------------------------------------*/
/*------------------------------------------------------*/
// Compile custom CSS and copy to dist/css
function styles() {
    return gulp.src(paths.styles.src, { sourcemaps: true })
        .pipe(postcss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest), { sourcemaps: '.' })
        .pipe(notify({message: '<%= file.relative %> compiled and distributed!', title: 'styles'}));
};
/*------------------------------------------------------*/
/* END STYLES TASKS ------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* DEV TASKS -------------------------------------------*/
/*------------------------------------------------------*/
// gulp init
var init = gulp.series(fontsInit);

// gulp build
var build = gulp.series(init, styles);
/*------------------------------------------------------*/
/* END DEV TASKS ---------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* EXPORT TASKS ----------------------------------------*/
/*------------------------------------------------------*/
exports.styles = styles;
exports.init = init;
exports.build = build;

// Define default task that can be called by just running `gulp` from cli
exports.default = build;
/*------------------------------------------------------*/
/* END EXPORT TASKS ------------------------------------*/
/*------------------------------------------------------*/
