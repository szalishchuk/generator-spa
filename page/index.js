'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var PageGenerator = module.exports = function PageGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the page subgenerator with the argument ' + this.name + '.');
};

util.inherits(PageGenerator, yeoman.generators.NamedBase);

PageGenerator.prototype.skeleton = function() {
  var baseDirectory = _.slugify(this.name);
  this.mkdir(baseDirectory);
  this.template('index.js', baseDirectory + '/index.js');
  this.template('router.js', baseDirectory + '/router.js');
};
