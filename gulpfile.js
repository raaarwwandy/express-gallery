/*jshint esverison:6 */

const gulp = require('gulp');
const scss = require('gulp-sass');
// const browserSync = require('browser-sync');

gulp.task('scss', () =>{
  return gulp.src('./scss/*.scss')
  .pipe(scss())
  .pipe(gulp.dest('./public/css'))
})

gulp.task('watch', ()=> {
  gulp.watch('./**/*.scss', ['scss'])
})



gulp.task('default', ['watch', 'scss'])