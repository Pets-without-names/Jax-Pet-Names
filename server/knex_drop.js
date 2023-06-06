require('dotenv').config();

const config = {
  client: 'postgresql',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};
const knex = require('knex')(config);
knex.raw('DROP DATABASE pet_names;').then(() => process.exit(0));
