define([
     'jquery'
    ,'underscore'
    ,'backbone'
    // Backbone extension for two way data-binding (View<->Model)
    ,'backbone.stickit'

    ], function(
                $
                ,_
                ,Backbone
    ) {
        
        Backbone.Stickit.addHandler({
            selector: 'input[type="radio"]',
            events: ['change'],
            update: function($el, val) {
                if (val === '') {
                    //clear radio buttons value
                    $el.filter(':checked').prop('checked', false);
                } else {
                    $el.filter('[value="' + val + '"]').prop('checked', true);
                }
            },
            getVal: function($el) {
              return $el.filter(':checked').val();
            }
        })
    }
);