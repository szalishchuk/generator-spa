define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    // Module composer prototype
    ,'prototypes/module.composer'

    ], function(
                $
                ,_
                ,Backbone
                ,Eva
                ,ModuleComposerPrototype
    ) {
        var <%= _.capitalize(name) %>Module = Backbone.Module.Composer.extend({
            tagName: 'section'
            ,className: 'module <%= name %>'
            ,submodules: [
                // Specify submodules
                // {
                //     constructor: SomeView
                //     ,arguments: { arg1, arg2 }
                // }
            ]
            ,initialize: function() {
                // Render the module
                this.render();
            }
        });

        return <%= _.capitalize(name) %>Module;
    }
);