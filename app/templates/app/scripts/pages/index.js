define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    // PageView prototype. All pages are extended from this View
    ,'prototypes/page.composer'

    // Modules
    // ,'path/to/module'
    
    ], function(
        $
        ,_
        ,Backbone
        ,Eva
        ,PageComposer
        // Module
    ) {
        var HomePage = Backbone.PageComposer.extend({
            className: 'page home'
            ,pageName: 'home'
            ,modules: [
                // Module
            ]
        });
        return HomePage;
    }
);