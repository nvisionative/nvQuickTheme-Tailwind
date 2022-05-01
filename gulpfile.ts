import gulp, { src } from 'gulp';

var log             = require('fancy-log'),
    paths           = require('./project-paths.json'),
    postcss         = require('gulp-postcss'),
    rename          = require('gulp-rename');

/*------------------------------------------------------*/
/* INIT TASKS ------------------------------------------*/
/*------------------------------------------------------*/
// Copy fonts from src/fonts to dist/fonts
function fontsInit() {
    var fileCount = 0;
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .on('data', function() { fileCount += 1; })
        .on('end', function() {
          log(fileCount, 'font file(s) distributed!');
        });
}

// Copy fontawesome-free fonts from node_modules to dist/fonts
function faFontsInit() {
  var fileCount = 0;
  return gulp.src(paths.faFonts.src)
    .pipe(gulp.dest(paths.faFonts.dest))
    .on('data', function() { fileCount += 1; })
    .on('end', function() {
      log(fileCount, 'webfont file(s) distributed!');
    });
}

// Copy fontawesome-free CSS from node_modules to dist/css
function faCssInit() {
  var fileCount = 0;
  return gulp.src(paths.faCss.src)
    .pipe(gulp.dest(paths.faCss.dest))
    .on('data', function() { fileCount += 1; })
    .on('end', function() {
      log(fileCount, 'CSS file(s) distributed!');
    });
}
/*------------------------------------------------------*/
/* END INIT TASKS --------------------------------------*/
/*------------------------------------------------------*/
  
  
/*------------------------------------------------------*/
/* STYLES TASKS ----------------------------------------*/
/*------------------------------------------------------*/
// Compile custom CSS and copy to dist/css
function styles() {
    var fileCount = 0;
    return gulp.src(paths.styles.src, { sourcemaps: true })
        .pipe(postcss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest), { sourcemaps: '.' })
        .on('data', function() { fileCount += 1; })
        .on('end', function() {
          log(fileCount, 'file(s) compiled and distributed!');
        });
};
/*------------------------------------------------------*/
/* END STYLES TASKS ------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* DEV TASKS -------------------------------------------*/
/*------------------------------------------------------*/
// gulp init
var init = gulp.series(fontsInit, faFontsInit, faCssInit);

// gulp build
var build = gulp.series(init, styles);
/*------------------------------------------------------*/
/* END DEV TASKS ---------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* EXPORT TASKS ----------------------------------------*/
/*------------------------------------------------------*/
exports.fontsInit = fontsInit;
exports.faFontsInit = faFontsInit;
exports.faCssInit = faCssInit;
exports.styles = styles;
exports.init = init;
exports.build = build;

// Define default task that can be called by just running `gulp` from cli
exports.default = build;
/*------------------------------------------------------*/
/* END EXPORT TASKS ------------------------------------*/
/*------------------------------------------------------*/
