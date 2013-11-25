define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    // PageComposer prototype
    ,'prototypes/page.composer'

    // Modules
    // ...
    
    ], function(
        $
        ,_
        ,Backbone
        ,Eva
        ,PageComposer
        // Modules
        // ...
    ) {
        var <%= _.camelize(_.capitalize(name)) %>Page = Backbone.PageComposer.extend({
            className: 'page <%= _.slugify(this.name) %>'
            ,pageName: '<%= _.slugify(this.name) %>'
            ,modules: [
                // Modules
                // ...
            ]
        });
        return <%= _.camelize(_.capitalize(name)) %>Page;
    }
);