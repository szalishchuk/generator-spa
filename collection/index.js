'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var CollectionGenerator = module.exports = function CollectionGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the collection subgenerator with the argument ' + this.name + '.');
};

util.inherits(CollectionGenerator, yeoman.generators.NamedBase);

CollectionGenerator.prototype.addCollection = function() {
  this.template('collection.js', 'collections/' + _.slugify(this.name) + '.js');
};