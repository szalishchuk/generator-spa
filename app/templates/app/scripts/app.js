define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'
    ,'router'

    ], function(
                $
                ,_
                ,Backbone
                ,Eva
                ,AppRouter
    ) {
        var App = new (Backbone.View.extend({
            events: {
                // For internal links prevent default and navigate to the corresponding url
                'click a[data-internal="true"]': 'handleInternalLinks'
                ,'click .goBack': 'goBack'
            }
            ,handleInternalLinks: function(e) {
                e.preventDefault();
                var href = $(e.currentTarget).attr('href').toString();
                this.appRouter.navigate(href, { trigger: true });
            }
            ,goBack: function(e) {
                e.preventDefault();
                window.history.back();
            }
            ,start: function() {
                // Passed in our Router module and call it's initialize function on instantiation
                this.appRouter = new AppRouter();

            }
        }))({el: document.body});

        return App;
    }
);