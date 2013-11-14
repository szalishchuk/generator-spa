require.config({
    baseUrl: "app/scripts"
    ,paths: {
    }
    ,shim: {
        'jquery': {
            exports: "$"
        }
        ,'underscore': {
            exports: "_"
        }
        ,'backbone': {
            deps: ["jquery", "underscore"]
            ,exports: "Backbone"
        }
        ,'backboneStickit': {
            deps: ["backbone"]
        }
        ,'infoBox': {
            exports: 'InfoBox'
        }
        ,'flexslider': {
            deps: ["jquery"]
            ,exports: "$.fn.flexslider"
        }
        ,'noUiSlider': {
            deps: ["jquery"]
            ,exports: "$.fn.noUiSlider"
        }
        ,'overthrow': {
            exports: "window.overthrow"
        }
        ,'googleAnalytics': {
            exports: 'ga'
        }
        ,'app': {
            deps: [
                "jquery"
                ,"underscore"
                ,"backbone"
                ,"requirejs-text"
                //,"async"
            ]
        }
    },
    waitSeconds: 50000,
    urlArgs: "bust=" + (new Date()).getTime() // Bust browser/server caching
});



require([
    // Load our app module and pass it to our definition function
    '../app'
    ], function(App) {
        App.start(); // The 'app' dependency is passed in as "App"
    }
);