require('dotenv').config();
const knex = require('knex')({
  client: 'postgresql',
  connection: process.env.DB_SETUP_URL,
});

knex
  .raw('CREATE DATABASE pet_names;')
  .catch((error) => console.log('Unable to create database pet_names. Proceeding assuming it already exists.'))
  .finally(() => process.exit(0));
