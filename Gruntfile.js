var extend = require('extend');

module.exports = function (grunt) {
  var compilerOptions = {
    compilation_level: 'ADVANCED_OPTIMIZATIONS',
    warning_level: 'VERBOSE',
    summary_detail_level: 3,
    language_in: 'ECMASCRIPT5_STRICT',
    output_wrapper: '"/* Type Rendering Mix JS - (c) 2013 Tim Brown, Bram Stein. License: new BSD */(function(){%output%}());"'
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build'],
    exec: {
      deps: {
        command: 'calcdeps -i src -p src -p vendor/google/base.js -o deps > test/deps.js'
      },
      test: {
        command: 'open test/index.html'
      },
      browserstacktest: {
        command: 'node_modules/.bin/browserstack-test' +
                 ' -u ' +
                    (grunt.option('browserstack-username') || '$BROWSERSTACK_USERNAME') +
                 ' -p ' +
                    (grunt.option('browserstack-password') || '$BROWSERSTACK_PASSWORD') +
                 ' -k ' +
                    (grunt.option('browserstack-key') || '$BROWSERSTACK_KEY') +
                 ' -b browsers.json -t 120 http://localhost:9999/test/index.html'
      },
      localtunnel: {
        command: 'node_modules/.bin/lt --port 9999'
      },
      assetgraph: {
        command: 'node_modules/.bin/buildProduction --optimizeimages --outroot build --root website/ website/index.html'
      }
    },
    connect: {
      server: {
        options: {
          base: "",
          port: 9999
        }
      }
    },
    watch: {},
    closurecompiler: {
      compile: {
        files: {
          'build/trmix.min.js': ['src/**/*.js', 'vendor/google/base.js']
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
      },
      concat: {
        files: {
          'build/trmix.js': ['src/**/*.js', 'vendor/google/base.js']
        },
        options: {
          debug: true,
          formatting: ['PRETTY_PRINT', 'PRINT_INPUT_DELIMITER'],
          output_wrapper: compilerOptions.output_wrapper
        }
      }
    },
    copy: {
      dist: {
        cwd: 'build',
        src: ['trmix.js', 'trmix.min.js'],
        dest: 'dist/',
        flatten: true,
        expand: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-closurecompiler');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('compile', ['closurecompiler:compile']);
  grunt.registerTask('debug', ['closurecompiler:debug']);
  grunt.registerTask('concat', ['closurecompiler:concat']);
  grunt.registerTask('deps', ['exec:deps']);
  grunt.registerTask('test', ['exec:test']);
  grunt.registerTask('browsertest', ['connect', 'exec:browserstacktest']);
  grunt.registerTask('localtunnel', ['connect', 'exec:localtunnel']);
  grunt.registerTask('website', ['compile', 'exec:assetgraph']);
  grunt.registerTask('dist',    ['compile', 'concat', 'copy:dist']);
  grunt.registerTask('default', ['compile']);
};
