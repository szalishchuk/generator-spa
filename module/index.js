'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the module subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.askFor = function() {
    //var cb = this.async();

    // Define question that should be asked on project init
    // var prompts = [
    //     {
    //       name: 'moduleName'
    //       ,message: 'What is the name of your module?'
    //     }
    // ];

    // this.prompt(prompts, function(props) {
    //     // Bind property names
    //     this.moduleName = props.moduleName;
    //     // Run callback function, which lets yeoman to move on
    //     cb();
    // }.bind(this));
    
    //cb();
};

ModuleGenerator.prototype.skeleton = function() {
  this.mkdir(this.name + '/views');
  this.mkdir(this.name + '/templates');
  this.mkdir(this.name + '/collections');
  this.mkdir(this.name + '/models');
};

ModuleGenerator.prototype.core = function() {
    this.template('composer.js', this.name + '/composer.js');
};