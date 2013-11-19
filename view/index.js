'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the view subgenerator with the argument ' + this.name + '.');
};

util.inherits(ViewGenerator, yeoman.generators.NamedBase);

ViewGenerator.prototype.askFor = function() {
    var cb = this.async();

    // Define question that should be asked on project init
    var prompts = [
        {
          name: 'moduleName'
          ,message: 'Please state the name of the module this view is created for.'
        }
    ];


    this.prompt(prompts, function(props) {
        // Bind property names
        this.viewClassname = this.name;
        this.moduleName = props.moduleName;
        // Run callback function, which lets yeoman to move on
        cb();
    }.bind(this));
    
};

ViewGenerator.prototype.addView = function() {
    this.template('view.js', 'views/' + this.viewClassname + '.js');
    this.template('template.html', 'templates/' + this.viewClassname + '.html');
};