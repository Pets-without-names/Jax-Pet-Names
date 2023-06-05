## Overview:
"Jax Pet Names" started with a lone volunteer at the Humane Society who identified the complexities faced by the organization when a dog with a cool name was adopted. That name, which would have previously been a duplicate (and there for not allowed as a name by the system), was now available to be assigned to an incoming pet. Wahoo!

Thinking up a good name for a pet at the shelter that was not a duplicate turned out to be a time consuming process. Sure, there are other pet naming tools out there. But why don't I make one myself? This brave soul asked into the universe! Next, forming a brainstorm at a local meetup a council was formed and this project began to churn into what you see today.

Primarily our planning is located: here: **(To Be Revealed, probably github issues or github project board.)**

regards, **woof woof meow**.

Cypress test suite usage:

1. If the front end and backend are not running:
`npm install; npm run app:cypress;`
2. If the front end and backend are running:
`npm install; npm run cypress;`

<details>
    <summary>
        <h2>Backend Details,</h2> sourced from the readme:
          <a href="https://github.com/JaxTurboNerd/Jax-Pet-Names/tree/main/server"> here </a>
    </summary>

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
7. Run migrations: `knex migrate:up`
8. You may need to run #5 multiple times until caught up.
9. Run seed to populate with demo data: `knex seed:run`
10. Navigate to Jax-Pet-Names directory: `cd ..`
11. Start the server: `npm run server`

### Current APIs
- `GET /names`
- `POST /names`
- `GET /names/:id`
- `PUT /names/:id`
- `DELETE /names/:id`

</details>


<details>
    <summary>
        <h2>Front End Details,</h2> sourced from the readme:
          <a href="https://github.com/JaxTurboNerd/Jax-Pet-Names/tree/main/client"> here </a>
    </summary>

# Pet Names Web App

This web app will allow the user to simply click a button and a randomly generated pet name will show. The user can chose between a male or female name.

## Requirements

- Node.js
- React

### Local Setup
1. Clone project: `git clone git@github.com:JaxTurboNerd/Jax-Pet-Names.git`
2. Navigate into folder: `cd Jax-Pet-Names/client`
3. Install dependencies: `npm install`
4. Navigate to Jax-Pet-Names directory: `cd ..`
5. Start just front end : `npm run client`
6. Usually you need the backend running locally along with the front end to start both at the same time run : `npm run app`


</details>