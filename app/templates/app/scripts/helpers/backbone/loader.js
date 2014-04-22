define([
     'jquery'
    ,'underscore'
    ,'backbone'
    ], function(
        $
        ,_
        ,Backbone
    ) {
        Loader = function(showLoader) {
            // this.showPopup = false;
            /*
                Callback for $.ajax.start()

                This callback is triggered when communcation with the
                server has started. Then loader is displayed, which will be
                removed once the request has succeeded or failed
            */
            this.onRequest = function(model, xhr, options) {
                
                // Overlay template
                var $overlay = _.template(
                    '<div class="overlay">' +
                        '<span class="spinner"></span>' +
                    '</div>');

                // Remove previously set state
                this.$el
                        .removeClass('error')
                        .find('.overlay').remove();

                // Add new state and overlay
                this.$el
                        .append($overlay);
                if (this.showLoader) {
                    this.$el.addClass('loading')
                }
            };
            /*
                Callback for $.ajax.success()

                If request was successful, then simply remove
                redundant elements from the DOM.

                Some modules may treat @this.onSync() callback in a different way.
                For instance, profile would display the popup, that profile was either
                successfully registered or changes has been saved. In this case we create
                a custom implementation of that method within module's composer.
                In profile's case it's @this._onSync() which overrides this callback
                in @this.initialize() function with this.onSync = this._onSync;
            */
            this.onFetch = function(model, response, options) {
                // If this.showLoader is not set, then do nothing
                if (!this.showLoader) return;
                
                /*  If request was successful, then:
                    -> change module's state back to normal
                    -> remove the loader from the DOM */
                this.$el
                    .removeClass('loading')
                    .find('.overlay').remove();
            };

            /*this.onSync = function(model, response, options) {
                console.log('onFetch');
                
                // If this.showLoader is not set, then do nothing
                if (!this.showLoader) return;
                
                /*  If request was successful, then:
                    -> change module's state back to normal
                    -> remove the loader from the DOM */
                /* this.$el
                    .removeClass('loading')
                    .find('.overlay').remove();
            };*/

            this.onSave = function(model, response, options) {
                var
                     self = this
                    // Set a proper string that will be used in the message, which is based on profile mode
                    // @2do :: move this from helper into the profile composer
                    ,mode = (self.mode === 'add') ? 'created' : 'updated';

                // Remove previous states
                this.$el
                        .removeClass('loading error')
                        .addClass('success');

                // If there's not success popup template defined,
                // simply hide the overlay and revert modules status back to normal
                if(!this.successPopup) {
                    this.$el
                        .removeClass('loading')
                        .find('.overlay').remove();
                    return;
                }

                this.showSuccessPopup(model, response, options);
            };
            /*
                Callback for $.ajax.error()
                
                We differentiate errors and the way we should react to them
                based on http status code. So we either display a popup or
                highlight fields that contain invalid data.
            */
            this.onError = function(model, xhr, options) {
                var self = this;

                switch (xhr.status) {
                    case 503: // Service is unavailable
                        this.showErrorPopup(model, xhr, options);
                        break;
                    case 500: // Server internal error
                        this.showErrorPopup(model, xhr, options);
                        break;
                    case 404: // Unknown url
                        this.showErrorPopup(model, xhr, options);
                        break;
                    case 401: // Server side validation error
                        this.onValidationError(model, xhr, options);
                        break;
                    case 400: // Server side validation error
                        this.onValidationError(model, xhr, options);
                        break;
                    default:
                        this.showErrorPopup(model, xhr, options);
                        break;
                };
            };
            this.save = function() {
                console.log(this.model.toJSON());
                if ( this.model.isValid(true) ) this.model.save();
            };

            /*
                This method is called when data we sent failed to
                pass through server side validation.
                So we should highlight all fields that contain invalid data
                the same way we would with client-side validation
            */
            this.onValidationError = function(model, xhr) {
                if (xhr.responseJSON !== undefined) {
                    var errors = xhr.responseJSON.errors;
                    if (errors !== undefined) {
                        var errorModels = {};
                        for (var i = 0;  i < errors.length; i++) {
                            //error name send in format model.innerModel.innerModel.. for backbone association models
                            var parsedErrorName = errors[i].fieldName.split('.');
                            var model = this.model;
                            for (var j = 0; j < parsedErrorName.length - 1; j++) {
                                if  (model instanceof Backbone.Collection) {
                                    model = model.at(parseInt(parsedErrorName[j], 10) - 1);
                                } else  {
                                    model = model.get(parsedErrorName[j]);
                                }
                            }
                            //save all invalid models
                            errorModels[model['cid']] = model;
                            model.serverErorrs = model.serverErorrs || {};
                            var modelAttr = parsedErrorName[parsedErrorName.length - 1];
                            //save server errors in format fieldName: error
                            model.serverErorrs[modelAttr] = errors[i].errorMessage;
                        }
                    }
                    //trigger invalid event for all models that haven't pass server side validation
                    _.each(errorModels, function(model, key) {
                        model.trigger('validated', false, model, errors);
                        model.trigger('validated:invalid', false, model, errors);
                    });
                    //call validation for currently showed model
                    //in case of different tabs call validate on a view
                    if (_.isFunction(this.validate)) {
                        this.validate();
                    } else {
                        this.model.validate();
                    }
                }
                 // Remove overlay and change module's state
                this.$el
                        .removeClass('loading')
                        .addClass('error')
                        .find('.overlay').remove();
            }
            /*
                Show a popup, when error has occured while communicating with the API.
                Popup is shown only for specific errors,
                a list of which you can find in @this.onError() callback
            */
            this.showErrorPopup = function(model, xhr, options) {
                var $error;
                var errors = xhr.responseJSON !== undefined ?  xhr.responseJSON.errors : xhr.responseText;
                var defaultMessage = 'Server is currently unavailable. Please try again later.';
                var errorMessage = '';
                var errorTemplate = '';
                var self = this;

                // Clear the element of previous error/loading states
                this.$el
                        .removeClass('loading')
                        .addClass('error')
                        .find('.error.popup').detach();

                // Create a template for the popup
                errorTemplate = _.template(
                    '<section class="error popup">' +
                        '<header><button class="close">Close</button></header>' +
                        '<section class="content">' +
                            '<header>' +
                                '<h1><%- error %></h1>' +
                            '</header>' +
                        '</section>' +
                        '<footer><button class="button retry">Retry</button></footer>' +
                    '</section>');
                
                // Go over errors array returned by the API
                // and concat them into a single errorMessage string
                if (_.isArray(errors)) {
                    _.each(errors, function(error, index, list) {
                        errorMessage = errorMessage + error.errorMessage;
                    });
                } else if (_.isString(errors)) {
                    //parse string as html
                    var htmlObj = $(errors);
                    //show just header if we receive html from server
                    var header = htmlObj.filter('h1');
                    header = header.length === 0 ? htmlObj.filter('title'): header
                    errorMessage = header.length > 0 ? header.text() : errors;
                } else {
                    errorMessage = defaultMessage;
                }

                // Render the template
                $error = errorTemplate({ error: errorMessage });

                // Inject it into the DOM
                this.$el.find('.overlay').append($error);

                // Setup event listeners
                this.$el.find('.overlay .retry').on('click', function(event) {
                    // Prevent form submit
                    event.preventDefault();
                    // Retry saving the profile
                    self.save();
                });
                this.$el.find('.overlay .close').on('click', function(event) {
                    // Prevent form submit
                    event.preventDefault();
                    // Remove error state and overlay, which contains the error popup
                    self.$el
                        .removeClass('error')
                        .find('.overlay').remove();
                });
            }
            this.showSuccessPopup = function(model, response, options) {
                var self = this;
                // Set attributes to be the empty object by default (in case it happens to be undefined)
                var attributes = this.attributes || {};

                this.$el
                        .removeClass('loading')
                        .find('.overlay')
                        .append(this.successPopup(_.extend(attributes, response)));

                // Setup event listeners
                this.$el.find('.overlay .close').on('click', function(event) {
                    // Prevent form submit
                    event.preventDefault();
                    // Remove error state and overlay, which contains the error popup
                    self.$el
                        .removeClass('success')
                        .find('.overlay').remove();
                });
            }
            /*
                This is basically init function of this helper.

                It sets up a list of callbacks, that should be triggered
                once event is triggered on a model.
            */
            this.subscribe = function() {
                // If model is not set -> do nothing
                if(!this.model) return;

                this.showLoader = showLoader !== undefined ? showLoader : true;

                // Subscription list
                this.model.on('request', this.onRequest, this);
                this.model.on('fetch', this.onFetch, this);
                this.model.on('save', this.onSave, this);
                this.model.on('sync', this.onSync, this);
                this.model.on('error', this.onError, this);
            }
            
            // Init the subscription
            this.subscribe();
        };
        
        return Loader;
    }
);