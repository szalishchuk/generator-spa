define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    // Module composer prototype
    ,'prototypes/module.composer'

    // Local dependencies
    ,'modules/<%= name %>/views/<%= viewClassname %>'

    ], function(
                $
                ,_
                ,Backbone
                ,Eva
                ,ModuleComposerPrototype
                ,<%= _.capitalize(viewClassname) %>
    ) {
        var <%= _.capitalize(name) %>Module = Backbone.ModuleComposer.extend({
            tagName: 'section'
            ,className: 'module <%= name %>'
            ,submodules: [
                // Specify submodules
                {
                    constructor: <%= _.capitalize(viewClassname) %>
                    ,arguments: {}
                }
            ]
            ,initialize: function() {
                // Render the module
                this.render();
            }
        });

        return <%= _.capitalize(name) %>Module;
    }
);