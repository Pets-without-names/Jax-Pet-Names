const knex = require('./knex.js');

const randomOffset = async (query) => {
  const countQuery = query.clone();
  const countResult = await countQuery.count();
  const count = countResult[0].count;

  return Math.floor(Math.random() * count);
};

const getName = async (request, response) => {
  let query = knex('pet_names');

  const is_male = request.query.is_male || null;
  if (is_male != null) {
    query = query.where({ is_male });
  }

  const offset = await randomOffset(query);
  query = query.offset(offset).limit(1);

  const results = await query.select();
  response.status(200).json(results);
};

const getNameById = async (request, response) => {
  const id = parseInt(request.params.id);
  const result = await knex('pet_names').where({ id }).first();
  const status = !!result ? 200 : 404;

  response.status(status).json(result);
};

const createName = async (request, response) => {
  const { name, is_male } = request.body;
  try {
    const result = await knex('pet_names').insert({ name, is_male }, [
      'id',
      'name',
      'is_male',
    ]);
    response.status(201).json(result[0]);
  } catch (error) {
    console.log(error);
    if (error.code == '23505') {
      response.status(598).json({ msg: `${name} already exists` });
      return;
    }
    response.status(500).json({ msg: 'something went wrong' });
  }
};

const updateName = async (request, response) => {
  const id = parseInt(request.params.id);
  const { name, is_male } = request.body;

  const result = await knex('pet_names')
    .where({ id })
    .update({ name, is_male }, ['id', 'name', 'is_male']);
  const status = !!result.length ? 200 : 404;

  response.status(status).json(result[0]);
};

const deleteName = async (request, response) => {
  const id = parseInt(request.params.id);

  const result = await knex('pet_names').where({ id }).del();

  response.status(204).send();
};

module.exports = {
  getName,
  getNameById,
  createName,
  updateName,
  deleteName,
};
