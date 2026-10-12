/*
 * Cookie consent for the Zen+ Health holding site (CookieConsent v3, MIT).
 * Two categories only: necessary (the consent cookie itself) and analytics
 * (Google Analytics 4). GA is never loaded until analytics is accepted.
 */
(function () {
  // GA4 property for zenplus.health.
  var GA_MEASUREMENT_ID = 'G-XJVY3P95TB';

  function loadAnalytics() {
    if (window.__gaLoaded) {
      return;
    }
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID);
  }

  function onConsentChange() {
    if (CookieConsent.acceptedCategory('analytics')) {
      loadAnalytics();
    }
  }

  if (typeof CookieConsent === 'undefined' || !CookieConsent.run) {
    return;
  }

  CookieConsent.run({
    guiOptions: {
      consentModal: { layout: 'box inline', position: 'bottom left', equalWeightButtons: true },
      preferencesModal: { layout: 'box', equalWeightButtons: true },
    },
    categories: {
      necessary: { enabled: true, readOnly: true },
      analytics: { autoClear: { cookies: [{ name: /^_ga/ }], reloadPage: true } },
    },
    onConsent: onConsentChange,
    onChange: onConsentChange,
    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: 'We use cookies',
            description:
              'We use one essential cookie to remember your choice. With your consent we also use ' +
              'Google Analytics to see how many people visit. See our <a href="/cookies/">Cookie Policy</a>.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage preferences',
          },
          preferencesModal: {
            title: 'Manage cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save preferences',
            closeIconLabel: 'Close',
            sections: [
              {
                title: 'Strictly necessary',
                description: 'Remembers your cookie choice. Always on.',
                linkedCategory: 'necessary',
              },
              {
                title: 'Analytics',
                description:
                  'Google Analytics counts visits and the pages people look at, so we can see ' +
                  'how the site is used. It only runs if you switch it on.',
                linkedCategory: 'analytics',
              },
            ],
          },
        },
      },
    },
  });
})();
