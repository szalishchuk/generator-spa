Collection subgenerator
#######################

Switch to a module's folder and run

yo spa:collection "collectionName"

This will create a file with slugified collectionName and a basic collection, which currently extends directly from Backbone.Collection.

Once you've created the collection, you have to wire it up, to the model of your choice (we'll probably add a prompt for the model name, for it to be wired up automatically, somewhere along the road).