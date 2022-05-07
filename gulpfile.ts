import gulp, { src } from 'gulp';

var jshint          = require('gulp-jshint'),
    log             = require('fancy-log'),
    paths           = require('./project-paths.json'),
    postcss         = require('gulp-postcss'),
    rename          = require('gulp-rename'),
    replace         = require('gulp-replace'),
    uglify          = require('gulp-uglify'),
    details         = require('./project-details.json'),
    project         = details.project,
    version         = details.version,
    author          = details.author,
    company         = details.company,
    url             = details.url,
    email           = details.email,
    description     = details.description;

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
/* SCRIPTS TASKS ---------------------------------------*/
/*------------------------------------------------------*/
// Compile custom JS and copy to dist/js
function scripts() {
  var fileCount = 0;
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(jshint())
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scripts.dest, { sourcemaps: '.' }))
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .on('data', function() { fileCount += 1; })
    .on('end', function() {
      log(fileCount, 'file(s) minified and distributed!');
    });
}
/*------------------------------------------------------*/
/* END SCRIPTS TASKS -----------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* DNN TASKS -------------------------------------------*/
/*------------------------------------------------------*/
// Update manifest.dnn
function manifest() {
  var fileCount = 0;
  return gulp.src(paths.manifest.src)
    .pipe(replace(/\<package name\=\"(.*?)(?=\")/, '<package name="' + company + '.' + project))
    .pipe(replace(/type\=\"Skin\" version\=\"(.*?)(?=\")/, 'type="Skin" version="' + version))
    .pipe(replace(/\<friendlyName\>(.*?)(?=\<)/, '<friendlyName>' + project))
    .pipe(replace(/\<description\>(.*?)(?=\<)/, '<description>' + description))
    .pipe(replace(/\<name\>(.*?)(?=\<)/, '<name>' + author))
    .pipe(replace(/\<organization\>(.*?)(?=\<)/, '<organization>' + company))
    .pipe(replace(/\<url\>(.*?)(?=\<)/, '<url>' + url))
    .pipe(replace(/\<email\>(.*?)(?=\<)/, '<email>' + email))
    .pipe(replace(/\<skinName\>(.*?)(?=\<)/, '<skinName>' + project))
    .pipe(replace(/(\\Skins\\)(.*?)(?=\\)/g, '\\Skins\\' + project))
    .pipe(replace(/(\\Containers\\)(.*?)(?=\\)/g, '\\Containers\\' + project))
    .pipe(gulp.dest(paths.manifest.dest))
    .on('data', function() { fileCount += 1; })
    .on('end', function() {
      log(fileCount, 'manifest file(s) updated and distributed!');
    });
}
/*------------------------------------------------------*/
/* END DNN TASKS ---------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* DEV TASKS -------------------------------------------*/
/*------------------------------------------------------*/
// gulp init
var init = gulp.series(fontsInit, faFontsInit, faCssInit);

// gulp build
var build = gulp.series(init, styles, scripts, manifest);
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
exports.scripts = scripts;
exports.manifest = manifest;
exports.init = init;
exports.build = build;

// Define default task that can be called by just running `gulp` from cli
exports.default = build;
/*------------------------------------------------------*/
/* END EXPORT TASKS ------------------------------------*/
/*------------------------------------------------------*/
