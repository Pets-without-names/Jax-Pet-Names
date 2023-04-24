const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "pet_names",
  password: "postgres",
  port: 5432,
});

const getNames = (request, response) => {
  pool.query("SELECT * FROM pet_names ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getNameById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM pet_names WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createName = (request, response) => {
  const { name, used } = request.body;

  pool.query(
    "INSERT INTO pet_names (name, used) VALUES ($1, $2)",
    [name, used],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Name added with ID: ${results.insertId}`);
    }
  );
};

const updateName = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, used } = request.body;

  pool.query(
    "UPDATE pet_names SET name = $1, used = $2 WHERE id = $3",
    [name, used, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Name modified with ID: ${id}`);
    }
  );
};

const deleteName = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM pet_names WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Name deleted with ID: ${id}`);
  });
};

module.exports = {
  getNames,
  getNameById,
  createName,
  updateName,
  deleteName,
};
