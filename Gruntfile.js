// Gruntfile
module.exports = function (grunt) {
  grunt.initConfig({
    paths: {
      js: ['source/script/**/*.js', 'source/script/**/*.jsx'],
      scss: ['source/style/**/*.scss'],
      main_scss: ['source/style/style.scss']
    },

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded',
          sourcemap: 'none'
        },
        files: {                                // Dictionary of files
          'build/style/style.css': '<%= paths.main_scss %>'     // 'destination': 'source'
        }
      }
    },

    eslint: {
      target: '<%= paths.js %>'
    },

    browserify: {
      options: {
        debug: true,
        transform: [['babelify', { presets: ['es2015', 'react'] }]]
      },
      script: {
        src: '<%= paths.js %>',
        dest: 'build/script/build.js'
      }
    },

    watch: {
      script: {
        files: '<%= paths.js %>',
        tasks: ['eslint', 'browserify']
      },
      style: {
        files: '<%= paths.scss %>',
        tasks: ['sass']
      }

    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['eslint', 'browserify', 'sass', 'watch']);
};
