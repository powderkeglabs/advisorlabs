var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var mailchimp_api_key = (env === 'development') ? require('./config-dev').mailchimp_api_key : null;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'advisorlabs'
    },
    port: 3000,
    db: 'postgres://postgres:postgres@localhost/advisorlabs',
    forceSync: true,
    mail_api_key: mailchimp_api_key,
    contact_email: 'advisors@powderkeglabs.com',
    contact_name: 'JJ from Advisor Labs'
  },

  test: {
    root: rootPath,
    app: {
      name: 'advisorlabs'
    },
    port: 3000,
    db: 'postgres://localhost/advisorlabs-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'advisorlabs'
    },
    port: process.env.PORT,
    db: process.env.DATABASE_URL,
    mail_api_key: process.env.MAILCHIMP_APIKEY,
    contact_email: 'advisors@powderkeglabs.com',
    contact_name: 'JJ from Advisor Labs'
  }
};

module.exports = config[env];
