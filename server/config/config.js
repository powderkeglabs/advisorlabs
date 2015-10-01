var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'advisorlabs'
    },
    port: 3000,
    db: 'postgres://postgres:postgres@localhost/advisorlabs',
    forceSync: true
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
    db: process.env.DATABASE_URL
  }
};

module.exports = config[env];
