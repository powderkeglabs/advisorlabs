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
        cmd: 'harp server client'
      },
      harp_compile: {
        cmd: 'harp compile client'
      },
      harp_dist: {
        cmd: 'harp server client/www'
      }
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
    'exec:harp_dev',
    'watch'
  ]);

  grunt.registerTask('dist', [
    'develop',
    'exec:harp_compile',
    'exec:harp_dist',
    'watch'
  ]);

};
