define([
     'jquery'
    ,'underscore'
    ,'backbone'
    ,'backbone-validation'

    ], function(
                $
                ,_
                ,Backbone
                ,Validation
    ) {
        
        Backbone.Validation.configure({
            // Since we are automatically updating the model, we want the model
            // to also hold invalid values, otherwise, we might be validating
            // something else than the user has entered in the form.
            // See: http://thedersen.com/projects/backbone-validation/#configuration/force-update
            forceUpdate: true
        });
        var modelServerValidation = function(model, view, attr, selector) {
            var serverErrors = model.serverErorrs;
            //Check if current attribute -attr pass server side validation if any was performed
            if (serverErrors && Object.keys(serverErrors).length > 0 && serverErrors[attr]) {
                //mark field as invalid if server side validation was not passed
                Backbone.Validation.callbacks.invalid.apply(this, [view, attr, serverErrors[attr], selector])
                delete model.serverErorrs[attr];
                //mark whole model as invalid
                model._isValid = false;
                return false;
            }
            return true;
        }
        var applyServerSideValidation = function(view, attr, selector) {
            var isValid = true;
            if (view.model instanceof Backbone.Model) {
                isValid = modelServerValidation(view.model, view, attr, selector);
            } else if (view.collection instanceof Backbone.Collection) {
                isValid = _.every(view.collection.models, function(model) {
                    return modelServerValidation(view.model, view, attr, selector);
                });
            }
          
            return isValid;
        }
        var getElement = function(view, attr, selector) {
            var $el;
            var selectorArr = selector.split(',');
            for (var i = 0; i < selectorArr.length; i++) {
                // Select a corresponding element
                $el = view.$('[' + selectorArr[i] + '~="' + attr + '"]');
                if ($el.length > 0) {
                    break;
                }
            }
            return $el;
        }

        _.extend(Backbone.Validation.callbacks, {
            valid: function(view, attr, selector) {
                var selector = selector || 'name';
                var isServerValidationPass = applyServerSideValidation(view, attr, selector);
                if (!isServerValidationPass) {
                    return;
                }
                var selectorArr = selector.split(',');
                var $el = getElement(view, attr, selector);
                // Select msg.field wrapper from the DOM
                var $field = $el.closest('.field');
                var $msg = $el.siblings('.msg');

                // If the msg text was previously replaced by error message
                // due to field content not being valid, restore it's original
                // contents from placeholder attribute
                $msg.text($el.prop('placeholder') || $el.data('placeholder'));
                // Remove invalid class in case it was previously set
                $field.removeClass('invalid');
                // Add valid class
                $field.addClass('valid')
            }
            ,invalid: function(view, attr, error, selector) {
                var selector = selector || 'name';
                var selectorArr = selector.split(',');
                for (var i = 0; i < selectorArr.length; i++) {
                    // Select a corresponding element
                    var $el = view.$('[' + selectorArr[i] + '~="' + attr + '"]');
                    if ($el.length > 0) {
                        break;
                    }
                }
                // Select msg.field wrapper from the DOM
                var $field = $el.closest('.field')
                var $msg = $el.siblings('.msg');
                    
                // Parse error message into the field's msg
                $msg.text(error);
                // Add invalid class for styling purposes
                $field.addClass('invalid')
            }  
        });
    }
);