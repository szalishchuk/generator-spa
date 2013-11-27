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
            }
            ,onInitialized: function() {
                // Make sure that corresponding views have enough time
                // to init and subscribe to pageChange event
                Eva.trigger('pageChange', this.pageView);
            }
            ,injectIndexPage: function() {
                // Set the pageView container as an $el for this obj
                this.$el = $('.page-wrap');
                // Instantiate ApplicationPageView only once
                if(!this.pageView) this.pageView = new this.options.index();
                // Detach all the other contents from the DOM
                // and preserve event binders with .detach()
                this.$el.contents().detach();
                // Inject it into the DOM
                this.$el.append(this.pageView.$el);
                // Wait for an app to initialize and then fire off the event
                Eva.on('app.initialized', this.onInitialized, this);
                // Trigger pageChange event to notify corresponding view to act
                // appropriately (e.g. close navigation bar)
                Eva.trigger('pageChange', this.pageView);
            }
        });
        return Backbone.PageRouter;
    }
);