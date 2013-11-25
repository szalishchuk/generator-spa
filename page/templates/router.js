define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    // PageRouter prototype
    ,'prototypes/page.router'

    // Index page for this route
    ,'pages/<%= _.slugify(name) %>/index'
    // Subroutes
    // ...

    ], function(
                $
                ,_
                ,Backbone
                ,Eva
                ,PageRouter
                ,IndexPage
                // ...
    ) {
        var <%= _.camelize(_.capitalize(name)) %>Router = Backbone.PageRouter.extend({
            // We are good to go with the base funcionality,
            // defined in the page.router prototype
            options: {
                index: IndexPage
            }
        });
        return <%= _.camelize(_.capitalize(name)) %>Router;
    }
);