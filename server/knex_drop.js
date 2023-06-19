require('dotenv').config();
const knex = require('knex')({
  client: 'postgresql',
  connection: process.env.DB_SETUP_URL,
});

knex
  .raw('DROP DATABASE pet_names;')
  .catch((error) => console.log('Unable to drop database pet_names. Proceeding assuming it does not exist yet.'))
  .finally(() => process.exit(0));
