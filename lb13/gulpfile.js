const { src, dest, watch, parallel, series } = require('gulp');

const scss          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const cssnano       = require('gulp-cssnano');
const rename        = require('gulp-rename');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
const del           = require('del');

function styles() {
    return src('app/scss/**/*.scss')
        .pipe(scss())
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('app/css'))
}

function scripts() {
    return src('app/js/**/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
}

function images() {
    return src('app/img/**/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'))
}

function cleanDist() {
    return del('dist')
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;

exports.default = parallel(styles, scripts, watching);
exports.build = series(cleanDist, images, styles, scripts);