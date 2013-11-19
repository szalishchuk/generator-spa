define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    // Subroute Backbone extension
    ,'libs/backbone/backbone.subroute.min'

    ], function(
                $
                ,_
                ,Backbone
                ,Eva
                ,Subroute
    ) {
        Backbone.Page.Router = Backbone.SubRoute.extend({
            routes: {
                '': 'injectIndexPage'
            },
            injectIndexPage: function() {
                // Set the pageView container as an $el for this obj
                this.$el = $('.page-wrap');
                // Instantiate ApplicationPageView only once
                if(!this.pageView) this.pageView = new this.options.index();
                // Detach all the other contents from the DOM
                // and preserve event binders with .detach()
                this.$el.contents().detach();
                // Inject it into the DOM
                this.$el.append(this.pageView.$el);
                // Trigger pageChange event to notify corresponding view to act
                // appropriately (e.g. close navigation bar)
                Eva.trigger('pageChange', this.pageView);
            }
        });
        return Backbone.Page.Router;
    }
);