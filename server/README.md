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
6. Setup database with tables and test data: `npm run db:setup`
7. Start the server: `node index.js`

### Docker
To avoid configuring Postgres locally, you can setup a Postgres container with Docker.
1. Ensure Docker is installed. See [Docker Engine docs](https://docs.docker.com/engine/install/) for installation instructions.
2. Close any current Postgres processes. MacOS: `brew services stop postgresql`, Ubuntu/Debian: `sudo systemctl stop postgresql`
3. Run command to setup Postgres container: `sudo docker run -p 5432:5432 --name jax-pet-names-pg -e POSTGRES_PASSWORD=postgres -d postgres`

### Database Scripts
- Create Database: `npm run db:create`
- Drop Database: `npm run db:drop`
- Migrate Database: `npm run db:migrate`
- Seed Database: `npm run db:seed`
- Reset Database (without seed): `npm run db:reset`
- Reset Database (with seed): `npm run db:setup`
- Production Database Setup: `npm run db:production:setup

### Current APIs
- `GET /names`
- `POST /names`
- `GET /names/:id`
- `PUT /names/:id`
- `DELETE /names/:id`
