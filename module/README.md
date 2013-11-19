Module subgenerator
###################

Modules and pages are the basis of blocks architecture, so having a subgenerator for both them is a natural desire.

Let's walk through the usage of module subgenerator

yo spa:module "moduleName"

Yeoman will ask you the following questions
- Please state className for the View? (viewClassname)

Once you answer all questions, yeoman will generate a new folder within current directory with the following structure

moduleName
-collections
-models
-templates
-views
--(viewClassname).js
-composer.js

composer.js is an entry point for communication with the paticular module. It allows you to
- specify all required dependencies and pass them onto corresponding instances as an argument (this allows you to avoid curcular dependencies issue)
- expose an API for external modules
- specify event subscriptions (e.g. if particular event occurs, then the module with update itself)
- easily cover your module with unit tests

Every Module is extended from Backbone.ModuleComposer, prototype which is setup here (app/scripts/prototype/module.composer.js). At this point, composer only provides an ability to specify submodules as a collection of views and pass specific arguments onto each of them. Initially you will have only one view (with the template), that were automatically created and wired up for you. You can add as many as you want.