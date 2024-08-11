const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 6000,
  setDisableBrowserFetching: false,
  chromeWebSecurity: false,
  experimentalWebKitSupport: true,
  reporter: 'cypress-mochawesome-reporter',

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Disable Chrome's "Save address?" pop up
          launchOptions.preferences.default.autofill.profile_enabled = false;

          return launchOptions;
        }
      });
      const environmentName = config.env.environmentName || 'dev';
      const environmentFilename = `./cypress.env.${environmentName}.json`;
      console.log(`loading ${environmentFilename}`);
      const settings = require(environmentFilename);
      if (settings.baseUrl) {
        if (config.e2e == undefined) {
          config.e2e = {};
        }
        config.baseUrl = settings.baseUrl;
        config.e2e.baseUrl = settings.baseUrl;
      }
      if (settings.env) {
        config.env = {
          ...config.env,
          ...settings.env,
        };
      }

      return config;
    },
  },
});
