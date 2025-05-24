'use strict';

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: './database.sqlite',
    seederStorage: 'sequelize',
    seederStorageTableName: 'SequelizeData',
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'SequelizeMeta',
    logging: console.log,
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
  production: {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
  },
};
