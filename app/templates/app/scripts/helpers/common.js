// Self executable function to run the code below
(function() {
    // Change the first letter of the string to the capital one
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };
    // Convert value to a number and set a comma with every 3 digits (e.g. $145,000,233)
    Number.prototype.toMoneyString = function() {
        return this.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    };
    // Convert a string to the object reference (objectType = 'View' || 'Model' || smth else)
    String.prototype.toObject = function(objectType) {
        return eval( this.capitalize() + objectType );
    };

    // Override setInterval function with a wrapper, that allows you to pass additional(3d)
    // argument, which defines if either the function should fire up immediately the first time or no
    var originalSetInterval = window.setInterval;
    window.setInterval = function(fn, delay, runImmediately) {
        // Check if the function should be fired up immediately
        var runImmediately = runImmediately || false;
        if(runImmediately) fn();
        // Then fire original setInterval
        originalSetInterval(fn, delay);
    };
}).call();