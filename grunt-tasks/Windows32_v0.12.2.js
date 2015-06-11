module.exports = function (grunt) {
  'use strict';

  var paths = grunt.config.get('paths'),
    pkg = grunt.config.get('pkg');

  grunt.config.merge({
    clean: {
      'Windows32_v0.12.2': {
        files: [{
          dot: true,
          src: ['<%= paths.dist %>/Windows32_v0.12.2/*', '.build']
        }]
      },
      'build-dir-Windows32_v0.12.2': {
        files: [{
          dot: true,
          src: ['.build/app.nw', '.build/nw.exe']
        }]
      }
    },
    copy: {
      'Windows32_v0.12.2': {
        options: {
          mode: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= paths.nwjsSource %>/nwjs-v0.12.2-win-ia32',
            dest: '.build',
            src: '**'
          }
        ]
      }
    },
    compress: {
      'to-tmp-Windows32_v0.12.2': {
        options: {
          archive: '.build/app.nw',
          mode: 'zip'
        },
        files: [{
          expand: true,
          cwd: '<%= paths.app %>',
          src: ['**']
        }]
      },
      'final-app-Windows32_v0.12.2': {
        options: {
          archive: '<%= paths.dist %>/Windows32_v0.12.2/<%= pkg.name %>.zip'
        },
        files: [{
          expand: true,
          cwd: '.build',
          src: ['**']
        }]
      }
    }
  });

  grunt.registerTask('create-app-Windows32_v0.12.2', 'Create windows distribution.', function () {
    var done = this.async(),
      concat = require('concat-files');
    concat([
      '.build/nw.exe',
      '.build/app.nw'
    ], '.build/' + pkg.name + '.exe', function (error) {
      if(error){
        grunt.log.error(error);
        done(error);
      }
      done();
    });
  });

  grunt.registerTask('Windows32_v0.12.2', function(){
    grunt.task.run([
      'clean:Windows32_v0.12.2',
      'copy:Windows32_v0.12.2',
      'compress:to-tmp-Windows32_v0.12.2',
      'create-app-Windows32_v0.12.2',
      'clean:build-dir-Windows32_v0.12.2',
      'compress:final-app-Windows32_v0.12.2'
    ]);
  });

};
