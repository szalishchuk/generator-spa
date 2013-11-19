define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    // Plugin that fixes lots of "overflow:auto" issues
    ,'overthrow'
    ], function(
                $
                ,_
                ,Backbone
                ,Eva
                ,overthrow
    ) {
        Backbone.Page.Composer = Backbone.View.extend({
            tagName: 'section'
            ,className: 'page'
            ,pageName: ''
            ,initialize: function() {
                // Subscribe to events eligible for every page
                Eva.on('page.scrollToTheTop', this.scrollToTheTop, this);
                // Render the page with all invoked modules
                this.render();
            }
            ,scrollToTheTop: function() {
                console.log(this.$el.get(0));
                overthrow.toss(
                    $('#page-wrap')[0], {
                        top: 200
                        ,duration: 80
                        ,easing: function (t, b, c, d) {
                            return c*((t=t/d-1)*t*t + 1) + b;
                        }
                    }
                );
                window.setTimeout(function() {
                    //overthrow.forget();
                    //overthrow.set();
                }, 90);
                console.log('scrollToTheTop currently does not work');
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
        return Backbone.Page.Composer;
    }
);