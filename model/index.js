'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the model subgenerator with the argument ' + this.name + '.');
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.addModel = function() {
  this.template('model.js', 'models/' + _.slugify(this.name) + '.js');
};