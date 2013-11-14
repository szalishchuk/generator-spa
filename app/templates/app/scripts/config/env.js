define([], function() {
    var env = {
        config: {
            // Local development environment
            local: {
                baseUrl: "localhost"
                ,desktopProtocol: "https://"
                ,desktopBaseUrl: "localhost"
                ,desktopRedirectionBustParameter: "referral=mobile"
                ,tickerApi: "https://tranquil-woodland-4170.herokuapp.com/api/loansStatistic?api=true"
                ,storeLocatorApi: "https://tranquil-woodland-4170.herokuapp.com/store/all?api=true"
                ,googleAnalyticsId: ""
            }
            // User Acceptance Testing
            ,uat: {
                baseUrl: "mobile-uat-easy-web.herokuapp.com"
                ,desktopProtocol: "https://"
                ,desktopBaseUrl: "tranquil-woodland-4170.herokuapp.com"
                ,desktopRedirectionBustParameter: "referral=mobile"
                ,tickerApi: "https://tranquil-woodland-4170.herokuapp.com/api/loansStatistic?api=true"
                ,storeLocatorApi: "https://tranquil-woodland-4170.herokuapp.com/store/all?api=true"
                ,googleAnalyticsId: ""
            }
            // Automation tests
            ,penetration: {
                baseUrl: "penetration-easyfinancial-mobi.herokuapp.com"
                ,desktopProtocol: "https://"
                ,desktopBaseUrl: "penetration-easyfinancial-desk.herokuapp.com"
                ,desktopRedirectionBustParameter: "referral=mobile"
                ,tickerApi: "https://penetration-easyfinancial-desk.herokuapp.com/api/loansStatistic?api=true"
                ,storeLocatorApi: "https://penetration-easyfinancial-desk.herokuapp.com/store/all?api=true"
                ,googleAnalyticsId: ""
            }
            // Production environment
            ,prod: {
                baseUrl: "m.easyfinancial.com"
                ,desktopProtocol: "https://"
                ,desktopBaseUrl: "www.easyfinancial.com"
                ,desktopRedirectionBustParameter: "referral=mobile"
                ,tickerApi: "https://www.easyfinancial.com/api/loansStatistic?api=true"
                ,storeLocatorApi: "https://www.easyfinancial.com/store/all?api=true"
                ,googleAnalyticsId: "UA-24391600-2"
            }
        }
        ,getEnvName: function() {
            var env;
            switch(window.location.hostname) {
                case "localhost":
                case "127.0.0.1":
                    env = "local"; break;
                case "mobile-uat-easy-web.herokuapp.com":
                    env = "uat"; break;
                case "penetration-easyfinancial-mobi.herokuapp.com":
                    env = "penetration"; break;
                case "m.easyfinancial.com":
                    env = "prod"; break;
                default:
                    console.warn('Unknown environment: ' + window.location.hostname );
                    env = "local"; break;
            }
            return env;
        }
        ,getUrlFor: function(key) {
            // Check if the requested url is available for that particular environment
            if(!this.config[this.name].hasOwnProperty(key)) { throw('Unknown url requested: ' + key ); }
            return this.config[this.name][key];
        }
        ,getBaseConfig: function() {
            return {
                baseUrl: env.getUrlFor('baseUrl')
                ,desktopProtocol: env.getUrlFor('desktopProtocol')
                ,desktopBaseUrl: env.getUrlFor('desktopBaseUrl')
                ,desktopRedirectionBustParameter: env.getUrlFor('desktopRedirectionBustParameter')
            }
        }
        ,init: function() {
            this.name = this.getEnvName();
        }
    };
    // Initialize the module
    env.init();

    return env;
});