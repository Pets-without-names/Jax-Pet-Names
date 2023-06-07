require('dotenv').config();
const environment = process.env.ENVIRONMENT || 'development'
const config = {
  development: {
    client: 'postgresql',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  staging: {
    client: 'postgresql',
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DB_URL,
  },
};
const knex = require('knex')(config[environment]);

knex.raw('DROP DATABASE pet_names;').then(() => process.exit(0));
