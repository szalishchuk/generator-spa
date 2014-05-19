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
        var _remove = Backbone.View.prototype.remove;
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
                this.moduleInstances = [];
                // Iterate through each module in the array,
                // which is a reference to the moduleClass,
                // instantiate it and append to the page's $el
                _.each(modules, function(module, index, list) {
                    moduleInstance = new module.constructor(
                        _.extend( module.arguments, { id: that.id, pageName: that.pageName } )
                    );
                    that.$el.append(moduleInstance.$el);
                    that.moduleInstances.push(moduleInstance);
                });
            }
            ,render: function() {
                // Invoke Modules that were specified for the page
                // within this.modules array (e.g. this.modules = [Module1, Module 2])
                this.invokeModules(this.modules);
                return this;
            }
            ,remove: function() {
                //trigger remove event to remove reference on this page from router
                this.trigger('remove');
                for (var i = 0; i < this.moduleInstances.length; i++) {
                    this.moduleInstances[i].remove();
                    this.moduleInstances[i].unbind();
                    Eva.off(this.moduleInstances[i]);
                }
                _remove.call(this);
                this.unbind();
                Eva.off(this);
            }

        });
        return Backbone.PageComposer;
    }
);