beforeEach(() => {
  jest.resetModules();
});

test('index', async () => {
  expect.assertions(2);

  const name = { id: 1, name: 'Spot', is_male: true };
  const request = { query: {} };
  const response = {
    status: (code) => {
      expect(code).toBe(200)

      return {
        json: (body) => {
          expect(body).toMatchObject(name)
        }
      }
    }
  };
  jest.mock('../src/nameQueries', () => ({
    getRandomName: jest.fn(() => Promise.resolve(name))
  }));

  let namesController = require('../src/namesController');
  await namesController.index(request, response);
});

test('show (success)', async () => {
  expect.assertions(2);

  const name = { id: 1, name: 'Spot', is_male: true };
  const request = { params: { id: 1 } };
  const response = {
    status: (code) => {
      expect(code).toBe(200)

      return {
        json: (body) => {
          expect(body).toMatchObject(name)
        }
      }
    }
  };
  jest.mock('../src/nameQueries', () => ({
    getNameById: jest.fn(() => Promise.resolve(name))
  }));

  let namesController = require('../src/namesController');
  await namesController.show(request, response);
});

test('show (not found)', async () => {
  expect.assertions(2);

  const request = { params: { id: 1 } };
  const error = { msg: 'Name not found' };
  const response = {
    status: (code) => {
      expect(code).toBe(404)

      return {
        json: (body) => {
          expect(body).toMatchObject(error)
        }
      }
    }
  };
  jest.mock('../src/nameQueries', () => ({
    getNameById: jest.fn(() => Promise.reject(error))
  }));

  let namesController = require('../src/namesController');
  await namesController.show(request, response);
});

test('show (unexpected error)', async () => {
  expect.assertions(2);

  const request = { params: { id: 1 } };
  const error = { msg: 'Something went wrong' };
  const response = {
    status: (code) => {
      expect(code).toBe(500)

      return {
        json: (body) => {
          expect(body).toMatchObject(error)
        }
      }
    }
  };
  jest.mock('../src/nameQueries', () => ({
    getNameById: jest.fn(() => Promise.reject(error))
  }));

  let namesController = require('../src/namesController');
  await namesController.show(request, response);
});

test('create (success)', async () => {
  expect.assertions(2);

  const name = { id: 1, name: 'Spot', is_male: true };
  const request = {
    body: {
      name: 'Spot',
      is_male: true
    }
  };
  const response = {
    status: (code) => {
      expect(code).toBe(201)

      return {
        json: (body) => {
          expect(body).toMatchObject(name)
        }
      }
    }
  };
  jest.mock('../src/nameQueries', () => ({
    createName: jest.fn(() => Promise.resolve(name))
  }));

  let namesController = require('../src/namesController');
  await namesController.create(request, response);
});

test('create (invalid)', async () => {
  expect.assertions(2);

  const request = {
    body: {
      name: 'Spot'
    }
  };
  const error = { msg: 'Invalid name fields' };
  const response = {
    status: (code) => {
      expect(code).toBe(422)

      return {
        json: (body) => {
          expect(body).toMatchObject(error)
        }
      }
    }
  };
  jest.mock('../src/nameQueries', () => ({
    createName: jest.fn(() => Promise.reject(error))
  }));

  let namesController = require('../src/namesController');
  await namesController.create(request, response);
});

test('create (unexpected error)', async () => {
  expect.assertions(2);

  const request = {
    body: {
      name: 'Spot',
      is_male: true
    }
  };
  const error = { msg: 'Something went wrong' };
  const response = {
    status: (code) => {
      expect(code).toBe(500)

      return {
        json: (body) => {
          expect(body).toMatchObject(error)
        }
      }
    }
  };
  jest.mock('../src/nameQueries', () => ({
    createName: jest.fn(() => Promise.reject(error))
  }));

  let namesController = require('../src/namesController');
  await namesController.create(request, response);
});

test('update (success)', async () => {
  const name = { id: 1, name: 'Spot', is_male: true };
  const request = {
    body: {
      id: 1,
      name: 'Spot',
      is_male: true
    }
  };
  const response = {
    status: (code) => {
      expect(code).toBe(200)

      return {
        json: (body) => {
          expect(body).toMatchObject(name)
        }
      }
    }
  };

  jest.mock('../src/nameQueries', () => ({
    updateName: jest.fn(() => Promise.resolve(name))
  }));

  let namesController = require('../src/namesController');
  await namesController.update(request, response);
});

test('update (invalid)', async () => {
  const error = { msg: 'Invalid name fields' };
  const request = {
    body: {
      id: 1,
      name: 'Spot',
      is_male: null
    }
  };
  const response = {
    status: (code) => {
      expect(code).toBe(422)

      return {
        json: (body) => {
          expect(body).toMatchObject(error)
        }
      }
    }
  };

  jest.mock('../src/nameQueries', () => ({
    updateName: jest.fn(() => Promise.reject(error))
  }));

  let namesController = require('../src/namesController');
  await namesController.update(request, response);
});

test('update (not found)', async () => {
  const error = { msg: 'Name not found' };
  const request = {
    body: {
      id: 1,
      name: 'Spot',
      is_male: true
    }
  };
  const response = {
    status: (code) => {
      expect(code).toBe(404)

      return {
        json: (body) => {
          expect(body).toMatchObject(error)
        }
      }
    }
  };

  jest.mock('../src/nameQueries', () => ({
    updateName: jest.fn(() => Promise.reject(error))
  }));

  let namesController = require('../src/namesController');
  await namesController.update(request, response);
});

test('update (unexpected error)', async () => {
  const error = { msg: 'Something went wrong' };
  const request = {
    body: {
      id: 1,
      name: 'Spot',
      is_male: true
    }
  };
  const response = {
    status: (code) => {
      expect(code).toBe(500)

      return {
        json: (body) => {
          expect(body).toMatchObject(error)
        }
      }
    }
  };

  jest.mock('../src/nameQueries', () => ({
    updateName: jest.fn(() => Promise.reject(error))
  }));

  let namesController = require('../src/namesController');
  await namesController.update(request, response);
});

test('destroy (success)', async () => {
  const request = { params: { id: 1 } };
  const response = {
    status: (code) => {
      expect(code).toBe(204)

      return {
        send: () => {}
      }
    }
  };

  jest.mock('../src/nameQueries', () => ({
    deleteName: jest.fn(() => Promise.resolve())
  }));

  let namesController = require('../src/namesController');
  await namesController.destroy(request, response);
});

test('destroy (not found)', async () => {
  const request = { params: { id: 1 } };
  const error = { msg: 'Name not found' };
  const response = {
    status: (code) => {
      expect(code).toBe(404)

      return {
        json: (body) => {
          expect(body).toMatchObject(error)
        }
      }
    }
  };

  jest.mock('../src/nameQueries', () => ({
    deleteName: jest.fn(() => Promise.reject(error))
  }));

  let namesController = require('../src/namesController');
  await namesController.destroy(request, response);
});

test('destroy (unexpected error)', async () => {
  const request = { params: { id: 1 } };
  const error = { msg: 'Something went wrong' };
  const response = {
    status: (code) => {
      expect(code).toBe(500)

      return {
        json: (body) => {
          expect(body).toMatchObject(error)
        }
      }
    }
  };

  jest.mock('../src/nameQueries', () => ({
    deleteName: jest.fn(() => Promise.reject(error))
  }));

  let namesController = require('../src/namesController');
  await namesController.destroy(request, response);
});
