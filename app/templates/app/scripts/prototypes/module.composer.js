define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    ], function(
                $
                ,_
                ,Backbone
                ,Eva
    ) {

        Backbone.ModuleComposer = Backbone.View.extend({
            tagName: 'section'
            ,className: 'module'
            ,moduleName: ''
            ,initialize: function() {
                // Render the module with all invoked modules
                this.render();
            }
            ,invokeSubmodules: function(submodules) {
                var that = this, submoduleInstance;
                // Iterate through each element in the array,
                // which is a reference to the submoduleClass,
                // instantiate it and append to the page's $el
                _.each(submodules, function(element, index, list) {
                    submoduleInstance = new element.constructor(element.arguments);
                    that.$el.append(submoduleInstance.$el);
                });
            }
            ,render: function() {
                this.invokeSubmodules(this.submodules);
                return this;
            }

        });
        return Backbone.ModuleComposer;
    }
);