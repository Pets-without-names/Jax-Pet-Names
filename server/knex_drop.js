require('dotenv').config();
const environment = process.env.ENVIRONMENT || 'development'
const config = {
  development: {
    client: 'postgresql',
    connection: process.env.DB_SETUP_URL,
  },
  staging: {
    client: 'postgresql',
    connection: process.env.DB_SETUP_URL,
  },
  production: {
    client: 'postgresql',
    connection: process.env.DB_URL,
  },
};
const knex = require('knex')(config[environment]);

knex
  .raw('DROP DATABASE pet_names;')
  .catch((error) => console.log('Unable to drop database pet_names. Proceeding assuming it does not exist yet.'))
  .finally(() => process.exit(0));
