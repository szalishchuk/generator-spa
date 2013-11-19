define([
    // Primary dependencies
    'jquery'
    ,'underscore'
    ,'backbone'
    ,'events'

    // Template
    ,'requirejs-text!modules/<%= name %>/templates/<%= viewClassname %>.html'

    ], function(
                $
                ,_
                ,Backbone
                ,Eva
                ,<%= _.join('', viewClassname, 'Template') %>
    ) {
        var <%= _.capitalize(viewClassname) %> = Backbone.View.extend({
            className: '<%= viewClassname %>'
            ,template: _.template(<%= _.join('', viewClassname, 'Template') %>)
            ,events: {}
            ,initialize: function() {
                this.render();
            }
            ,render: function() {
                // Render the template
                this.$el.html(this.template);
                // Return the viewObj onRender to enable chain call
                return this;
            }
        });

        return <%= _.capitalize(viewClassname) %>;
    }
);