View subgenerator
###################

Once you've generated a module, you have only one view and template to work with. Although that rearly would satisfy your demands, therefore we have a separate spa:view subgenerator, that allows you to create a new view with the template and wire them up.

Note! You have to create a reference to a new View from ModuleComposer yourself, by adding a path to the view within the require.js define(['new/path'], function(newView)) module, and additional collection to the submodules array.

submodules: [
    {
        constructor: newView
        ,arguments: {}
    }
]