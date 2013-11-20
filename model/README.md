Model subgenerator
##################

Switch to a module's folder and run

yo spa:model "modelName"

This will create a model.js file with slugified modelName and a basic model, which currently extends directly from Backbone.Model.

Once you've created the model, you have to wire it up, to the view of your choice (we'll probably add a prompt for the view name, for it to be wired up automatically, somewhere along the road).