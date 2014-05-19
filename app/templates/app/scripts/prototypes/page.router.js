define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    // Subroute Backbone extension
    ,'backbone.subroute'

    ], function(
                $
                ,_
                ,Backbone
                ,Eva
                ,Subroute
    ) {
        Backbone.PageRouter = Backbone.SubRoute.extend({
            routes: {
                '': 'injectIndexPage'
                ,':pageName(/*subroute)': 'invokePageModule'
            }
            ,injectIndexPage: function() {
                var self = this;
                // Set the pageView container as an $el for this obj
                this.$el = this.$el || $('.page-wrap');
                // Instantiate ApplicationPageView only once
                if(!this.pageView) this.pageView = new this.options.index();
                // Detach all the other contents from the DOM
                // and preserve event binders with .detach()
                this.$el.contents().detach();
                // Inject it into the DOM
                this.$el.append(this.pageView.$el);
                // Trigger pageChange event to notify corresponding view to act
                // appropriately (e.g. close navigation bar)
                Eva.trigger('page:change', this.pageView);
                this.pageView.on('remove', function() {
                    self.pageView = null;
                });
            }
            ,invokePageModule: function(pageName, subroute) {
                // Transform passed in 'module' string to the unified format
                // and create a reference to the object with the name that matches the string
                // Eval the corresponding page router (e.g. ApplicationPageRouter)
                try {
                    var PageRouter = this.options[pageName.toLowerCase() + 'PageRouter'];
                    var prefix = this.prefix === undefined ? '' : this.prefix + '/';
                    // If it does exist, then instantiate it's router
                    this.pageRouter = new PageRouter(
                                            prefix + pageName.toLowerCase(),
                                            { createTrailingSlashRoutes: true });
                } catch(e) {
                    console.log(e, 'Route delegation failed');
                    this.injectIndexPage(pageName, subroute);
                }
            }
        });
        return Backbone.PageRouter;
    }
);