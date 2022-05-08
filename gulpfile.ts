import gulp, { src } from 'gulp';

var clean           = require('gulp-clean'),
    jshint          = require('gulp-jshint'),
    log             = require('fancy-log'),
    paths           = require('./project-paths.json'),
    postcss         = require('gulp-postcss'),
    rename          = require('gulp-rename'),
    replace         = require('gulp-replace'),
    uglify          = require('gulp-uglify'),
    zip             = require('gulp-zip'),
    details         = require('./project-details.json'),
    project         = details.project,
    version         = details.version,
    author          = details.author,
    company         = details.company,
    url             = details.url,
    email           = details.email,
    description     = details.description;

var dynamicPaths = {
  "containers": {
    "src": "./containers/*",
    "dest": "../../Containers/" + project + "/"
  },
  "zippackage": {
    "src": ["./temp/*.zip", "*.{dnn,png,jpg,txt}", "LICENSE"],
    "zipfile": project + "\_" + version + "\_install.zip",
    "dest": "./build/"
  },
};

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
// Copy containers to proper DNN theme containers folder
function containers() {
  var fileCount = 0;
  return gulp.src(dynamicPaths.containers.src)
    .pipe(gulp.dest(dynamicPaths.containers.dest))
    .on('data', function() { fileCount += 1; })
    .on('end', function() {
      log(fileCount, 'container file(s) distributed!');
    });
}

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
/* MAINTENANCE TASKS -----------------------------------*/
/*------------------------------------------------------*/
// Clean up dist folder
function cleandist() {
  return gulp.src(paths.cleandist.src, { allowEmpty: true })
    .pipe(clean())
    .on('end', function() {
      log('dist folder cleaned up!');
    });
}
/*------------------------------------------------------*/
/* END MAINTENANCE TASKS -------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* PACKAGING TASKS -------------------------------------*/
/*------------------------------------------------------*/
// ZIP contents of dist folder
function zipdist() {
  return gulp.src(paths.zipdist.src)
    .pipe(zip(paths.zipdist.zipfile))
    .pipe(gulp.dest(paths.zipdist.dest))
    .on('end', function() {
      log('dist folder zipped and temporarily stored!');
    });
}

// ZIP contents of containers folder
function zipcontainers() {
  return gulp.src(paths.zipcontainers.src)
    .pipe(zip(paths.zipcontainers.zipfile))
    .pipe(gulp.dest(paths.zipcontainers.dest))
    .on('end', function() {
      log('containers folder zipped and temporarily stored!');
    });
}

// ZIP everything else
function zipelse() {
  return gulp.src(paths.zipelse.src, {base: '.'})
    .pipe(gulp.dest(paths.zipelse.dest))
    .pipe(replace('dist/', ''))
    .pipe(zip(paths.zipelse.zipfile))
    .pipe(gulp.dest(paths.zipelse.dest))
    .on('end', function() {
      log('menus/partials/layouts/koi.json zipped and temporarily stored!');
    });
}

// git ziptemp
var ziptemp = gulp.series(zipdist, zipcontainers, zipelse);

// Assemble files into DNN theme install package
function zippackage() { 
  return gulp.src(dynamicPaths.zippackage.src)
    .pipe(zip(dynamicPaths.zippackage.zipfile))
    .pipe(gulp.dest(dynamicPaths.zippackage.dest))
    .on('end', function() {
      log('theme install package created!');
    });
}

// Clean temp folder
function cleantemp() {
  return gulp.src(paths.cleantemp.src)
    .pipe(clean())
    .on('end', function() {
      log('temp folder cleaned up!');
    });
}
/*------------------------------------------------------*/
/* END PACKAGING TASKS ---------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* DEV TASKS -------------------------------------------*/
/*------------------------------------------------------*/
// gulp init
var init = gulp.series(fontsInit, faFontsInit, faCssInit);

// gulp build
var build = gulp.series(cleandist, init, styles, scripts, containers, manifest);

// gulp packageTheme
var packageTheme = gulp.series(build, ziptemp, zippackage, cleantemp);
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
exports.containers = containers;
exports.manifest = manifest;
exports.cleandist = cleandist;
exports.zipdist = zipdist;
exports.zipcontainers = zipcontainers;
exports.zipelse = zipelse;
exports.ziptemp = ziptemp;
exports.zippackage = zippackage;
exports.cleantemp = cleantemp;
exports.init = init;
exports.build = build;
exports.packageTheme = packageTheme;

// Define default task that can be called by just running `gulp` from cli
exports.default = build;
/*------------------------------------------------------*/
/* END EXPORT TASKS ------------------------------------*/
/*------------------------------------------------------*/
