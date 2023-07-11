require('dotenv').config();
const knex = require('knex')({
  client: 'postgresql',
  connection: process.env.DB_SETUP_URL,
});

knex.raw('CREATE DATABASE pet_names;').then(() => process.exit(0));
