define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    // Helpers
    ,'helpers/common'

    // Home page
    ,'pages/index'
    // Declared subroutes
    // pages/.../router

    ], function(
        $
        ,_
        ,Backbone
        ,Eva
        ,helpers
        ,HomePage
        // ...
    ) {
        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'invokeIndexPage'
                ,':pageName(/*subroute)': 'invokePageModule'
            }
            ,currentPage: null
            ,initialize: function(options) {
                this.$el = $('#page-wrap');
                this.startHistory();
                // Publish app.initiliazed event for things like google analytics to kick in
                Eva.trigger('app.initialized');
                Eva.on('navigateTo', this.onNavigateTo);
            }
            ,startHistory: function() {
                if(!Backbone.History.started)
                    Backbone.history.start({pushState: true});
            }
            ,onNavigateTo: function(href) {
                this.navigate(href, { trigger: true });
            }
            // Invoke Home Page Module
            ,invokeIndexPage: function() {
                // Instantiate LocationsPageView only once
                if(!this.pageView) this.pageView = new HomePage();
                // Detach all the other contents from the DOM
                // and preserve event binders with .detach()
                this.$el.contents().detach();
                // Inject it into the DOM
                this.$el.append(this.pageView.$el);
                // Trigger pageChange event to notify corresponding view to act
                // appropriately (e.g. close navigation bar)
                Eva.trigger('pageChange', this.pageView);
            }
            // Invoke Page Module along with it's nested modules and subroutes
            ,invokePageModule: function(pageName, subroute) {
                // Transform passed in 'module' string to the unified format
                // and create a reference to the object with the name that matches the string
                // Eval the corresponding page router (e.g. ApplicationPageRouter)

                // Check if this Page Module exists
                try {
                    var PageRouter = eval(pageName.toLowerCase().capitalize() + 'PageRouter');
                    // If it does exist, then instantiate it's router
                    this.pageRouter = new PageRouter(
                                            pageName.toLowerCase(),
                                            { createTrailingSlashRoutes: true });
                // If not -> fallback to the 404 page
                } catch(e) {
                    // Detach all the other contents from the DOM
                    // and preserve event binders with .detach()
                    this.$el.contents().detach();
                    // If the error was instantiated before, then reuse that view
                    if(!this.errorPageView) this.errorPageView = new ErrorModuleController({ errorCode: '404' });
                    // Then append it to the DOM
                    this.$el.append(this.errorPageView.$el);
                }
            }
        });

        return AppRouter;
    }
);