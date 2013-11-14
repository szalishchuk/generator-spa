define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'

    // Environment stats
    ,'config/env'
    
    ], function( $, _, Backbone, env ) {

        // Event aggregator
        var Eva = _.extend({}, Backbone.Events);

        // Make Eva available locally for easier debugging
        if(env.name === 'local') window.Eva = Eva;

        return Eva;
    }
);