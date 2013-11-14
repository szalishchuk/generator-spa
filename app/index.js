'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SpaGenerator = module.exports = function SpaGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SpaGenerator, yeoman.generators.Base);

SpaGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  // Define question that should be asked on project init
  var prompts = [
    {
      name: 'authorName'
      ,message: 'Please state your name:'
    }
    ,{
      name: 'authorEmail'
      ,message: 'Please state your email'
    }
    ,{
      name: 'appName'
      ,message: 'What is the name of your app?'
    }
  ];

  this.prompt(prompts, function (props) {
    // Bind property names
    this.authorName = props.authorName;
    this.authorEmail = props.authorEmail;
    this.appName = props.appName;

    // Run callback function, which lets yeoman to move on
    cb();
  }.bind(this));
};

SpaGenerator.prototype.skeleton = function app() {
  // Create root directory for the app
  this.mkdir('app');
    this.mkdir('app/scripts');
    this.mkdir('app/styles');
    this.mkdir('app/vendors');
    this.template('app/index.html', 'app/index.html');
  // Target directory with packages ready for distribution
  this.mkdir('dist');
  // Phonegap configuration root
  this.mkdir('phonegap');
  // Phonegap development root
  this.mkdir('build');
};

// Generate scripts for our app
SpaGenerator.prototype.scripts = function() {
  this.mkdir('app/scripts/config');
    // Configure internal dependency management with RequireJS
    this.template('app/scripts/config/main.js', 'app/scripts/config/main.js');
    // Configure environment (local/uat/production) dependent settings
    this.template('app/scripts/config/env.js', 'app/scripts/config/env.js');

  this.mkdir('app/scripts/modules');
  this.mkdir('app/scripts/pages');
    //this.template('app/scripts/pages/index.js', 'app/scripts/pages/index.js');

  this.mkdir('app/scripts/prototypes');
    // this.template('app/scripts/prototypes/module.composer.js', 'app/scripts/prototypes/module.composer.js');
    // this.template('app/scripts/prototypes/page.composer.js', 'app/scripts/prototypes/page.composer.js');
    // this.template('app/scripts/prototypes/page.router.js', 'app/scripts/prototypes/page.router.js');

  this.mkdir('app/scripts/helpers');
    // Add commonly used methods and functions, that should be available throughout the app
    this.template('app/scripts/helpers/common.js', 'app/scripts/helpers/common.js');

  // Bootstrap
  this.template('app/scripts/app.js', 'app/scripts/app.js');
  // Primary router
  this.template('app/scripts/router.js', 'app/scripts/router.js');
  // Event bus
  this.template('app/scripts/events.js', 'app/scripts/events.js');
};

// Generate styles for our app
SpaGenerator.prototype.styles = function() {
  // Top layer file, which composes everything we've got
  this.copy('app/styles/package.less', 'app/styles/package.less');

  // Primary dependencies
  this.mkdir('app/styles/deps');
    // Import fonts
    this.copy('app/styles/deps/fonts.less', 'app/styles/deps/fonts.less');
    // Set variables
    this.copy('app/styles/deps/variables.less', 'app/styles/deps/variables.less');
    // Define mixins
    this.copy('app/styles/deps/mixins.less', 'app/styles/deps/mixins.less');

  // Base layer :: general styling for HTML elements and very straightforward classes
  this.mkdir('app/styles/base');
    // Composes everything we've got within this layer
    this.copy('app/styles/base/index.less', 'app/styles/base/index.less');

  // Module's layer :: complete self-standing modules
  this.mkdir('app/styles/modules');
    // Composes everything we've got within this layer
    this.copy('app/styles/modules/index.less', 'app/styles/modules/index.less');

  // Page's layer :: page specific changes that should not effect the whole module
  this.mkdir('app/styles/pages');
    // Composes everything we've got within this layer
    this.copy('app/styles/pages/index.less', 'app/styles/pages/index.less');
};

SpaGenerator.prototype.configs = function() {
  // Configure our primary dependencies, which should be loaded with npm
  this.template('_package.json', 'package.json');
  // Configure our taskrunner (run / build / deploy)
  this.template('Gruntfile.js', 'Gruntfile.js');
  // Configure our dependency manager with a set of ..dependencies
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
  // User's promts recorded once the generator finished it's job
  this.template('_config.json', 'config.json');
  // Configure phonegap app
  this.copy('phonegap/config.xml', 'phonegap/config.xml');
  this.copy('phonegap/config.json', 'phonegap/config.json');
};


SpaGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.template('README.md', 'README.md');
};
