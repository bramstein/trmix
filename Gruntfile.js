var extend = require('extend');

module.exports = function (grunt) {
  var compilerOptions = {
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    warning_level: 'VERBOSE',
    summary_detail_level: 3,
    language_in: 'ECMASCRIPT5_STRICT',
    output_wrapper: '"(function(){%output%}());"'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build'],
    exec: {
      deps: {
        command: 'calcdeps -i src -p src -p vendor/google/base.js -o deps > test/deps.js'
      }
    },
    closurecompiler: {
      compile: {
        files: {
          'build/trmix.js': ['src/**/*.js', 'vendor/google/base.js']
        },
        options: extend({}, compilerOptions, {
          define: 'goog.DEBUG=false'
        })
      },
      debug: {
        files: {
          'build/trmix.debug.js': ['src/**/*.js', 'vendor/google/base.js']
        },
        options: extend({}, compilerOptions, {
          debug: true,
          formatting: ['PRETTY_PRINT', 'PRINT_INPUT_DELIMITER']
        })
      }
    }
  });

  grunt.loadNpmTasks('grunt-closurecompiler');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('compile', ['closurecompiler:compile']);
  grunt.registerTask('deps', ['exec:deps']);
  grunt.registerTask('debug', ['closurecompiler:debug']);
  grunt.registerTask('default', ['compile']);
};
