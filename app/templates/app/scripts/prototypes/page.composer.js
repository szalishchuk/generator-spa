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
        Backbone.PageComposer = Backbone.View.extend({
            tagName: 'section'
            ,className: 'page'
            ,pageName: ''
            ,initialize: function() {
                // Render the page with all invoked modules
                this.render();
            }
            ,invokeModules: function(modules) {
                var that = this, moduleInstance;
                // Iterate through each element in the array,
                // which is a reference to the moduleClass,
                // instantiate it and append to the page's $el
                _.each(modules, function(element, index, list) {
                    moduleInstance = new element;
                    that.$el.append(moduleInstance.$el);
                    //console.log(moduleInstance.$el);
                });
            }
            ,render: function() {
                this.invokeModules(this.modules);
                return this;
            }

        });
        return Backbone.PageComposer;
    }
);