const knex = require('../knex.js');
const PET_NAME_COLUMNS = ['id', 'name', 'is_male'];

const getNameById = async (id) => {
  try {
    await validateNameExists(id);
    const nameRecord = await knex('pet_names').where({ id }).first();
    return Promise.resolve(nameRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const getRandomName = async (is_male = null) => {
  let query = knex('pet_names');

  if (is_male != null) {
    query = query.where({ is_male });
  }

  const offset = await randomOffset(query);
  query = query.offset(offset).limit(1);

  return query.select();
};

const createName = async (data) => {
  try {
    const nameRecord = await knex('pet_names').insert(data, PET_NAME_COLUMNS);
    return Promise.resolve(nameRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const updateName = async (data) => {
  const id = data.id;
  delete data.id;

  try {
    await validateNameExists(id);

    const nameRecord = await knex('pet_names')
      .where({ id })
      .update(data, PET_NAME_COLUMNS);
    return Promise.resolve(nameRecord);
  } catch (error) {
    return Promise.reject({ msg: parseDatabaseError(error) });
  }
};

const deleteName = async (id) => {
  await validateNameExists(id);

  return knex('pet_names').where({ id }).del();
};

const randomOffset = async (query) => {
  const countQuery = query.clone();
  const countResult = await countQuery.count();
  const count = countResult[0].count;

  return Math.floor(Math.random() * count);
};

const validateNameExists = async (id) => {
  const nameRecords = await knex('pet_names').where({ id });
  if (nameRecords.length === 0) {
    return Promise.reject({ msg: 'Name not found' });
  }
};

const parseDatabaseError = (error) => {
  if (error?.msg) {
    return error.msg;
  }

  if (error?.code === '23505') {
    return 'Name already exists';
  } else if (error?.code === '42703') {
    return 'Invalid name fields';
  }

  return 'Something went wrong';
};

module.exports = {
  getNameById,
  getRandomName,
  createName,
  updateName,
  deleteName
};
