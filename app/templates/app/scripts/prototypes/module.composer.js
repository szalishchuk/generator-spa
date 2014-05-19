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
        Backbone.ModuleComposer = Backbone.View.extend({
            tagName: 'section'
            ,className: 'module'
            ,moduleName: ''
            ,beforeInit: function(attributes, options) {}
            ,initialize: function(attributes, options) {
                // Fire before initialize callback
                this.beforeInit(attributes, options);
                // Render the module with all invoked modules
                this.render();
                // Fire after initialize callback
                this.afterInit(attributes, options);
            }
            ,afterInit: function(attributes, options) {}
            ,invokeSubmodules: function(submodules) {
                var that = this, submoduleInstance;
                this.views = [];
                // Iterate through each element in the array,
                // which is a reference to the submoduleClass,
                // instantiate it and append to the page's $el
                _.each(submodules, function(submodule, index, list) {
                    submoduleInstance = new submodule.constructor(
                        _.extend( submodule.arguments, { id: that.id, pageName: that.pageName } )
                    );
                    //save all submodule instances into views array
                    that.views.push(submoduleInstance);
                    that.$el.append(submoduleInstance.$el);
                });
            }
            ,render: function() {
                this.invokeSubmodules(this.submodules);
                return this;
            }
            ,remove: function() {
                //loop through all submodules and remove them all
                if (_.isArray(this.views)) {
                    for (var i = 0; i < this.views.length; i++) {
                        this.views[i].remove();
                        this.views[i].unbind();
                        Eva.off(this.views[i])
                    }
                }
                //call Backbone remove method for module instance
                _remove.call(this);
                this.unbind();
                Eva.off(this);
            }
        });
        return Backbone.ModuleComposer;
    }
);