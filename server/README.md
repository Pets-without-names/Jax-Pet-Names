# Pet Names Server

### Requirements
- Node.js (18.15.0 or higher)
- Postgres (14.7 or higher)

### Local Setup
1. Clone project: `git clone git@github.com:JaxTurboNerd/Jax-Pet-Names.git`
2. Navigate into folder: `cd Jax-Pet-Names/server`
3. Add .env file with your database credentials. Set variables `DB_NAME`, `DB_USER`, `DB_PASSWORD`.
4. Install dependencies: `npm install`
5. Install `knex` globally: `npm install knex -g`
6. Create database: `CREATE DATABASE pet_names;`
7. Run migrations: `cd server && knex migrate:up` after loading repeat the command `knex migrate:up`
8. Run seed to populate with demo data: `knex seed:run && cd ..`
9. Start the server: `node index.js`

### Current APIs
- `GET /names`
- `POST /names`
- `GET /names/:id`
- `PUT /names/:id`
- `DELETE /names/:id`
