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
    var <%= _.camelize(_.capitalize(name)) %> = Backbone.Collection.extend({
        // model: SomeModel
        // ,url: env.getUrlFor('APIkey')
        ,initialize: function() {
            this.fetch();
        }
    });

    return <%= _.camelize(_.capitalize(name)) %>;
});