// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

'use strict';
 
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
 
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  grunt.initConfig({
    pgk: grunt.file.readJSON('package.json')
    // Automagically wire-up installed Bower components into your RequireJS config
    ,bower: {
      target: {
        rjsConfig: 'app/scripts/config/main.js'
        ,options: {
          baseUrl: 'app/scripts'
        }
      }
    }
    // Compile all scripts and their dependencies into a single file using r.js
    ,requirejs: {
      compile: {
        options: {
          name: 'app'
          ,baseUrl: './app/scripts'
          ,mainConfigFile: './app/scripts/config/main.js'
          ,out: './dist/webapp/package.js'
        }
      }
    }
    // Run predefined tasks whenever watched file patterns are added, changed or deleted
    ,watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      livereload: {
        // Files to watch
        files: [ 'app/index.html', 'app/styles/package.less' ]
        // Tasks to run on file change
        ,tasks: ['build', 'less:development']
      }
    }
    // Compile LESS files to CSS
    ,less: {
      development: {
        options: {
          paths: ['app/styles']
        }
        ,files: {
          'app/styles/package.css': 'app/styles/package.less'
        }
      }
      ,production: {
        options: {
          paths: ["app/styles"]
          ,cleancss: true
        }
        ,files: {
          'app/styles/package.css': 'app/styles/package.less'
        }
      }
    }
    // Serve the files of the project on specified port and hostname
    ,connect: {
      options: {
        port: 9000
        // change this to '0.0.0.0' to access the server from outside
        ,base: 'app'
        ,directory: 'app'
        ,hostname: 'localhost'
      }
      ,livereload: {
        options: {
          middleware: function (connect) {
            return [ lrSnippet, mountFolder(connect, 'app/') ];
          }
        }
      }
    }
    // Open your browser at the project's URL
    ,open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    }
    ,phonegap: {
      config: {
        root: 'app'
        ,config: 'phonegap/config.xml'
        ,cordova: 'phonegap'
        ,path: 'build'
        //,plugins: ['/local/path/to/plugin', 'http://example.com/path/to/plugin.git']
        ,platforms: ['android']
        ,maxBuffer: 200 // You may need to raise this for iOS.
        ,verbose: false
        ,releases: 'dist'
        ,releaseName: function(){
          var pkg = grunt.file.readJSON('package.json');
          return(pkg.name + '-' + pkg.version);
        }

        // Android-only integer version to increase with each release.
        // See http://developer.android.com/tools/publishing/versioning.html
        ,versionCode: function(){ return(1) }
      }
    }
  });

  // Type 'grunt build' from the console to:
  
  // get the application up and running
  grunt.registerTask('run', [
    'bower'
    ,'less:development'
    ,'open'
    ,'connect:livereload'
    ,'watch'
  ]);
 
  // create a distributive version for production
  grunt.registerTask('build:webapp', [
    'bower'
    ,'less:production'
    ,'requirejs'
  ]);

  grunt.registerTask('build:android', [
    'bower'
    ,'phonegap:build'
  ]);

};