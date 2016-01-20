module.exports = function(grunt) {
  
  grunt.initConfig({
    browserify: {
      dev: {
        files: {
          "public/assets/js/bundle.js": ["lib/index.js"]
        },
        options: {
          watch: true,
          keepAlive: true
        }
      },
      dist: {
        files: {
          "public/assets/js/bundle.js": ["lib/index.js"]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          "public/assets/js/bundle.min.js": ["public/assets/js/bundle.js"]
        },
        options: {
          compress: true,
          mangle: true
        }
      }
    },
    watch: {
      dev: {
        files: ["lib/*.js"],
        tasks: ["browserify:dev"]
      }
    }
  });
  
  
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  
  grunt.registerTask("default", ["watch:dev"]);
  grunt.registerTask("dist", ["browserify:dist", "uglify:dist"]);
  
}