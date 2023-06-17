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

knex.raw('CREATE DATABASE pet_names;').then(() => process.exit(0));
