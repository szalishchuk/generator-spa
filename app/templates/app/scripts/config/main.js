require.config({
     baseUrl:                    "scripts"
    ,paths: {
         backbone:               "../vendors/backbone/backbone"
        ,jquery:                 "../vendors/jquery/dist/jquery"
        ,requirejs:              "../vendors/requirejs/require"
        ,underscore:             "../vendors/underscore/underscore"
        ,async:                  "../vendors/requirejs-plugins/src/async"
        ,text:                   "../vendors/requirejs-plugins/lib/text"
        ,fastclick:              "../vendors/fastclick/lib/fastclick"
        ,"backbone.stickit":     "../vendors/backbone.stickit/backbone.stickit"
        ,"backbone.subroute":    "../vendors/backbone.subroute/backbone.subroute"
        ,"backbone.dualstorage": "../vendors/backbone.dualstorage/backbone.dualstorage.amd"
        ,"backbone-validation":  "../vendors/backbone-validation/dist/backbone-validation-amd"
        ,"requirejs-domready":   "../vendors/requirejs-domready/domReady"
    }
    ,shim: {
         jquery:         { exports: "$" }
        ,underscore:     { exports: "_" }
        ,backbone: {
             deps:       [ "jquery", "underscore" ]
            ,exports:    "Backbone"
        }
        ,app: {
            deps: [
                 "jquery"
                ,"underscore"
                ,"backbone"
                ,"text"
            ]
        }
    }
    ,waitSeconds: 50000
    ,urlArgs: "bust=1385504881274"
});

// Load our app module and fire it up
require(['app'], function(App) {
    App.start();
});



