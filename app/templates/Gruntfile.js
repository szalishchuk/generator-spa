// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

'use strict';
 
var LIVERELOAD_PORT = 35730;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var pushStateHook = function (url) {
    var path = require('path');
    var request = require('request');
    return function (req, res, next) {
        var ext = path.extname(req.url);
        if ((ext == "" || ext === ".html") && req.url != "/") {
            req.pipe(request(url)).pipe(res);
        } else {
            next();
        }
    };
};
 
module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        // Set environment specific properties
        ,env: {
             options: {}
            ,dev: {
                 NODE_ENV: 'DEVELOPMENT'
                ,DEST: 'build/platforms/webapp'
            }
            ,prod: {
                 NODE_ENV: 'PRODUCTION'
                ,DEST: 'dist/webapp'
            }
        }
        ,preprocess: {
            options: {
                context: {
                     name : '<%= pkg.name %>'
                    ,version : '<%= pkg.version %>'
                }
            }
            ,dev: {
                 src:   'app/_index.html'
                ,dest:  'app/index.html'
            }
            ,prod: {
                 src:   'app/_index.html'
                ,dest:  'dist/webapp/index.html'
            }
        }
        ,clean: {
            dev:    [ /* Nothing to clean, since dev environment is using source directory to run */ ]
            ,prod:   [ 'dist/webapp' ]
        }
        ,copy: {
            dev:  [ /* Nothing to copy */ ]
            ,prod: {
                 expand:    true
                ,flatten:   true
                ,src:       'app/images/*'
                ,dest:      'dist/webapp/images'
            }
        }
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
            prod: {
                options: {
                     almond:            true
                    ,wrap:              true
                    ,include:           [ 'config/main' ]
                    ,insertRequire:     [ 'config/main' ]
                    ,name:              '../vendors/almond/almond'
                    ,baseUrl:           'app/scripts'
                    ,mainConfigFile:    'app/scripts/config/main.js'
                    ,out:               'dist/webapp/scripts/package.js'
                }
            }
        }
        // Run predefined tasks whenever watched file patterns are added, changed or deleted
        ,watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            }
            ,livereload: {
                // Files to watch
                files: [ 'app/index.html', '/app/scripts/*.js', '**/*.less' ]
                // Tasks to run on file change
                ,tasks: [ 'less:development', 'autoprefixer' ]
            }
        }
        // Parse CSS and add vendor prefixes to CSS rules using values from the Can I Use.
        ,autoprefixer: {
            options: {
                browsers: [ "last 5 version", "> 1%", 'android 4' ]
            }
            ,dev: {
                src: 'app/styles/package.css'
            }
            ,prod: {
                src: 'dist/webapp/styles/package.css'
            }
        }
        // Compile LESS files to CSS
        ,less: {
            dev: {
                options: {
                  paths: ['app/styles']
                }
                ,files: {
                  'app/styles/package.css': 'app/styles/package.less'
                }
            }
            ,prod: {
                options: {
                   paths: ["app/styles/*"]
                  ,cleancss: true
                }
                ,files: {
                  'dist/webapp/styles/package.css': 'app/styles/package.less'
                }
            }
        }
        // Serve the files of the project on specified port and hostname
        ,connect: {
            options: {
                 port: 80
                ,base: 'app'
                ,directory: 'app'
                ,hostname: 'localhost'
            }
            ,livereload: {
                options: {
                  middleware: function (connect) {
                      return [
                        pushStateHook("http://localhost")
                        ,lrSnippet
                        ,mountFolder(connect, 'app')
                    ];
                  }
                }
            }
        }
        // Build and run hybrid applications with Apache Cordova (Phonegap)
        ,phonegap: {
            config: {
                 root: 'app'
                ,cordova: 'phonegap'
                ,config: 'phonegap/config.xml'
                ,path: 'build'
                ,plugins: [
                    // Specify a url with a plugin
                ]
                ,platforms: [ 'android' ]
                ,maxBuffer: 200
                ,verbose: true
                ,releases: 'dist'
                ,releaseName: function(){
                    return(pkg.name + '-' + pkg.version);
                }
                // Android-only integer version to increase with each release.
                // See http://developer.android.com/tools/publishing/versioning.html
                ,versionCode: function(){ return(1) }
                ,key: {
                     store: 'android.keystore'
                    ,alias: 'yourAlias'
                    ,aliasPassword: function(){
                      // Prompt, read an environment variable, or just embed as a string literal
                      return('password');
                    }
                    ,storePassword: function() {
                      // Prompt, read an environment variable, or just embed as a string literal
                      return('password');
                    }
                }
                ,icons: {
                    android: {
                         ldpi:  ''
                        ,mdpi:  ''
                        ,hdpi:  ''
                        ,xhdpi: ''
                    }
                }
                ,screens: {
                    android: {
                         ldpi:      ''
                        ,ldpiLand:  ''
                        ,mdpi:      ''
                        ,mdpiLand:  ''
                        ,hdpi:      ''
                        ,hdpiLand:  ''
                        ,xhdpi:     ''
                        ,xhdpiLand: ''
                    }
                }
            }
        }
    });

    // Build a development version of web app
    grunt.registerTask('build:webapp', [
        'env:dev'
        // Clean the target directory
        ,'clean:dev'
        // Copy files within specified directory into target directory
        ,'copy:dev'
        // Compile source less files and copy package.css to the target directory
        ,'less:dev'
        // Process final css file by adding vendor prefixes
        ,'autoprefixer:dev'
        // Compile an index.html file for development and put it into the target directory
        ,'preprocess:dev'
        // Start a local webserver with livereload
        ,'connect:livereload'
        // Watch target directory and perform specified tasks, whenever file changes
        ,'watch'
    ]);

    // Build a distributive version of web app
    grunt.registerTask('build:webapp:production', [
        // Set production environment
        'env:prod'
        // Clean the target directory
        ,'clean:prod'
        // Copy files within specified directory into target directory
        ,'copy:prod'
        // Compile source less files and copy package.css to the target directory
        ,'less:prod'
        // Process final css file by adding vendor prefixes
        ,'autoprefixer:prod'
        // Fetch all dependencies and uglify everything into a single package.js file
        ,'requirejs:prod'
        // Compile an index.html file for production and put it into the target directory
        ,'preprocess:prod'
    ]);









    // Build a development version of android app
    grunt.registerTask('build:android', [
         'less:development'
        ,'autoprefixer'
        ,'phonegap:build'
    ]);

    // Build a production version of android app
    grunt.registerTask('build:android:production', [
         'build:webapp:production'
        ,'phonegap:release:android'
    ]);

    // Run a development version of android app
    // If device lookup will be unsuccessful,
    // then the app will be copied onto Android virtual machine
    // and launched automatically. For this virtual machine should
    // be up and running with android virtual device manager (avd)
    grunt.registerTask('run:android', [
         'less:production'
        ,'autoprefixer'
        ,'phonegap:run'
    ]);

};