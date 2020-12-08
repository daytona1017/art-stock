var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");

// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", async function () {
  gulp
    .src(["node_modules/bootstrap/scss/bootstrap.scss", "scss/main.scss"])
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: ["scss"],
      })
    )
    .pipe(gulp.dest("css"))
    .pipe(autoprefixer())
    .pipe(browserSync.stream());
});

// Move the javascript files into our /src/js folder
gulp.task("js", async function () {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/popper.min.js",
    ])
    .pipe(gulp.dest("js"))
    .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task("browser-sync", async function () {
  browserSync.init(["css/*.css", "js/*.js"], {
    server: {
      baseDir: "./",
    },
  });
});

gulp.task("default", gulp.series("sass", "js", "browser-sync", async function () {
  gulp.watch("scss/**/*.scss", gulp.series("sass"));
  gulp.watch("*.html").on("change", browserSync.reload);
}));
