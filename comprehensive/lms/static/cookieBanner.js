/* Microsoft customization: Adding cookie related JS functions */

oxa = window.oxa || {};

(function (namespace) {
    namespace.cookieBanner = cookieBanner;
    var proto = cookieBanner.prototype;
    var consentCookieName = "cookie-banner";
    var consentCookieMarkup = "<div id=\"cookie-notice\" class=\"cookie-notice\"><svg class=\"cc-icon cc-v-center\" x=\"0px\" y=\"0px\" viewBox=\"0 0 44 44\" height=\"25px\" fill=\"none\"" +  "stroke=\"currentColor\"><circle cx=\"22\" cy=\"22\" r=\"20\" stroke-width=\"2\"></circle><line x1=\"22\" x2=\"22\" y1=\"18\" y2=\"33\" stroke-width=\"3\"></line><line x1=\"22\" x2=\"22\" y1=\"12\" y2=\"15\" stroke-width=\"3\">" + "</line></svg> <span class=\"cookie-text\">This site uses cookies for analytics, personalized content and ads. By continuing to browse this site, you agree to this use.</span>" +
        "<a id=\"btnPrivacy\" href=\"https://go.microsoft.com/fwlink/?linkid=845480\" target=\"_blank\">Learn more</a></div>";

    // locale drives the language of the cookie banner text and country drives whether a consent is required for a particular country
    // setting it to a euro region to have IsConsentRequired = true as all times until we get an ip detection service to use.
    var locale = "en-us";
    var country = "fr";
    var useCustomConsent = false;

    // constructor
    function cookieBanner() {
        var self = this;
        
        try {
            var cookieValues = JSON.parse(proto.Get(addr));        
            if (proto.Error == null && cookieValues != null) {
                // TODO:Check for each and every value availability, if missing value, just use our banner
                proto.IsConsentRequired = cookieValues.IsConsentRequired;
                proto.CookieName = cookieValues.CookieName;
                proto.Css = cookieValues.Css[0];
                proto.Domain = cookieValues.Domain;
                proto.Js = cookieValues.Js[0];
                proto.Locale = cookieValues.Locale;
                proto.Markup = cookieValues.Markup;
                proto.Error = cookieValues.Error;
            } else {
                proto.initializeCustomConsent();
            }
        }
        catch(error) {
            proto.initializeCustomConsent();
        }
    };
    
    // setup the consent callbacks for the custom cookie banner
    proto.initializeCustomConsent = function () {
        proto.useCustomConsent = true;
        // track the user clicks, anchor/button and exclude the LearnMore link on the banner itself
        $(document).ready(function () {
            if (self.getCookie(consentCookieName) !== "true") {
                $("a, button").on("click", proto.cookieClickHandler);
            } else {
                self.closeCookieBanner();
            }
        });  
    };
    
    // makes a get call to the given url (e.g. cookie api url)
    proto.Get = function (apiUrl) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", apiUrl, false);
        httpRequest.send(null);
        return httpRequest.responseText;
    };

    // Loads the Cookie API JS
    // cache:false, causes the timestamp parameters to be added on the js, where the service is not accepting currently
    proto.LoadJSCookieAPI = function (url, options) {
        // Allow user to set any option except for dataType, cache, and url
        options = $.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });
        return jQuery.ajax(options);
    };

   // Adds function BI cookies
    proto.addBICookies = function () {
        // Allow BI cookies
        (function (a, b, c, d) {
            a = '//tags.tiqcdn.com/utag/msft/lex-openedx/prod/utag.js';
            b = document;
            c = 'script';
            d = b.createElement(c);
            d.src = a;
            d.type = 'text/java' + c;
            d.async = true;
            a = b.getElementsByTagName(c)[0];
            a.parentNode.insertBefore(d, a);
        })();
    };

    // Click handler for the cookie consent
    proto.cookieClickHandler = function () {
        if (this.id !== "btnPrivacy") {
            this.setCookie(consentCookieName, "true", 13 * 30);
            proto.closeCookieBanner();
        }
    };

    // sets the cookie given name, value and expiration days
    // it sets the cookie for all the sub pages of the site
    proto.setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        // Need to set the path of the cookie so that it is accessible from the successor pages.
        // Otherwise the set cookie is not accessible by child pages causing the cookie-banner to show again uselessly
        // even if it was closed at a parent page.
        var path = "path=/";
        document.cookie = cname + "=" + cvalue + "; " + expires + "; " + path;
    };

    // gets the cookie value given the cookie name
    proto.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "false";
    };

    // closes down the custom cookie banner by setting the cookie-banner cookie and unregisters the click events
    proto.closeCookieBanner = function () {
        var cookieContainer = document.getElementById("cookie-notice");
        if (cookieContainer) {
            cookieContainer.style.display = "none";
        }

        // Allow BI cookies
        proto.addBICookies();

        //unregister the anchor/button clicks so we don't keep tracking if the consent is already given
        $("a, button").off("click", proto.cookieClickHandler);
    };
}

(oxa));

var cookieNotice = new oxa.cookieBanner();
