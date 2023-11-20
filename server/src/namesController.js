const nameQueries = require('./nameQueries');

const index = async (request, response) => {
  const is_male = request.query.is_male || null;

  try {
    const results = await nameQueries.getRandomName(is_male);
    response.status(200).json(results);
  } catch (error) {
    const status = parseErrorStatus(error);
    response.status(status).json(error)
  }
};

const show = async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const result = await nameQueries.getNameById(id);
    response.status(200).json(result);
  } catch (error) {
    const status = parseErrorStatus(error);
    response.status(status).json(error)
  }
};

const create = async(request, response) => {
  const data = { name, is_male } = request.body;
  try {
    const result = await nameQueries.createName(data);
    response.status(201).json(result);
  } catch (error) {
    const status = parseErrorStatus(error);
    response.status(status).json(error);
  }
};

const update = async(request, response) => {
  const data = { id, name, is_male } = request.body;
  try {
    const result = await nameQueries.updateName(data);
    response.status(200).json(result);
  } catch (error) {
    const status = parseErrorStatus(error);
    response.status(status).json(error);
  }
};

const destroy = async(request, response) => {
  const id = parseInt(request.params.id);

  try {
    const result = await nameQueries.deleteName(id);
    response.status(204).send();
  } catch (error) {
    const status = parseErrorStatus(error);
    response.status(status).json(error);
  }
};

const parseErrorStatus = (error) => {
  switch (error?.msg) {
    case 'Name not found':
      return 404;
    case 'Invalid name fields':
      return 422;
    default:
      return 500;
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
