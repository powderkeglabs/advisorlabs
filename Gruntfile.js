'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'server/app.js'
      }
    },
    exec: {
      harp_dev: {
        cmd: './node_modules/harp/bin/harp server client'
      },
      harp_compile: {
        cmd: './node_modules/harp/bin/harp compile client'
      },
      harp_dist: {
        cmd: './node_modules/harp/bin/harp server client/www'
      }
    },
    ngconstant: {
      options: {
        name: 'config',
        wrap: "'use strict';\n\n{%= __ngModule %}",
        space: '  '
      },
      development: {
        options: {
          dest: 'client/public/assets/js/config.js'
        },
        constants: {
          ENV: 'development',
          HOST: 'http://192.168.1.11:3000'
        }
      },
      production: {
        options: {
          dest: 'client/public/assets/js/config.js'
        },
        constants: {
          ENV: 'production',
          HOST: ''
        }
      },
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      js: {
        files: [
          'server/app.js',
          'server/app/**/*.js',
          'server/config/*.js',
          '!server/tests'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      // css: {
      //   files: [
      //     'public/css/*.css'
      //   ],
      //   options: {
      //     livereload: reloadPort
      //   }
      // },
      // views: {
      //   files: [
      //     'app/views/*.ejs',
      //     'app/views/**/*.ejs'
      //   ],
      //   options: { livereload: reloadPort }
      // }
    }
  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', [
    'develop',
    'ngconstant:development',
    'exec:harp_dev',
    'watch'
  ]);

  grunt.registerTask('dist', [
    'develop',
    'ngconstant:production',
    'exec:harp_compile',
    'exec:harp_dist',
    'watch'
  ]);

};
