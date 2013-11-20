define([
    // Primary dependency
    'jquery'
    ,'underscore'
    ,'backbone'

    // Environment stats
    ,'config/env'

], function(
            $
            ,_
            ,Backbone
            ,env
) {
    var <%= _.camelize(_.capitalize(name)) %> = Backbone.Model.extend({
        // Add new stuff...
        // For instance, utilize the API based on enviroment the app is running in
        // url: env.getUrlFor('APIkey')
    });

    return <%= _.camelize(_.capitalize(name)) %>;
});