const nameQueries = require('../src/nameQueries');
const knex = require('../knex.js');

afterEach(async () => {
  await knex('pet_names').del();
  return Promise.resolve();
});

afterAll((done) => {
  knex.destroy();
  done();
});

test('getNameById valid', async () => {
  const result = await knex('pet_names').insert({ name: 'Spot', is_male: true }, ['id']);
  const id = result[0].id;
  const nameRecord = await nameQueries.getNameById(id);
  expect(nameRecord.id).toBe(id);
});

test('getNameById not found', async () => {
  expect.assertions(1);

  try {
    await nameQueries.getNameById(999);
  } catch (error) {
    expect(error.msg).toBe('Name not found');
  }
});

test('getRandomName without is_male', async () => {
  const names = ['Spot', 'Ryan', 'Bob', 'Kenny'];
  const promises = names.map((name) => knex('pet_names').insert({ name, is_male: true }));
  await Promise.all(promises);

  const nameRecords = await nameQueries.getRandomName();
  expect(nameRecords.length).toBe(1)
  expect(names.includes(nameRecords[0].name)).toBe(true);
});

test('getRandomName with is_male', async () => {
  const maleNames = ['Spot', 'Ryan', 'Bob', 'Kenny'];
  const femaleNames = ['Jane', 'Jen', 'Megan'];

  const malePromises = maleNames.map((name) => knex('pet_names').insert({ name, is_male: true }));
  const femalePromises = femaleNames.map((name) => knex('pet_names').insert({ name, is_male: false }));
  await Promise.all([...malePromises, ...femalePromises]);

  const maleRecords = await nameQueries.getRandomName(true);
  const femaleRecords = await nameQueries.getRandomName(false);

  expect(maleRecords.length).toBe(1)
  expect(maleRecords.length).toBe(1)
  expect(maleNames.includes(maleRecords[0].name)).toBe(true);

  expect(femaleRecords.length).toBe(1)
  expect(femaleRecords.length).toBe(1)
  expect(femaleNames.includes(femaleRecords[0].name)).toBe(true);
});

test('createName new name', async () => {
  const name = 'Spot';
  const is_male = true;

  await nameQueries.createName({ name, is_male });

  const newName = await knex('pet_names').first();
  expect(newName.name).toBe(name);
  expect(newName.is_male).toBe(is_male);
});

test('createName duplicate name', async () => {
  expect.assertions(1);

  const data = { name: 'Spot', is_male: true };

  await nameQueries.createName(data); // First insert works

  try {
    await nameQueries.createName(data); // Second insert fails
  } catch (error) {
    expect(error.msg).toBe(`Name already exists`);
  }
});

test('createName invalid data', async () => {
  expect.assertions(1);

  try {
    await nameQueries.createName({ foo: 'bar' });
  } catch (error) {
    expect(error.msg).toBe('Invalid name fields');
  }
});

test('updateName valid data', async () => {
  const result = await knex('pet_names').insert({ name: 'Spot', is_male: true }, ['id']);
  const id = result[0].id;
  const data = { id, name: 'Spotty', is_male: false };

  await nameQueries.updateName(data);

  const nameRecord = await knex('pet_names').first();
  expect(nameRecord.id).toBe(id);
  expect(nameRecord.name).toBe('Spotty');
  expect(nameRecord.is_male).toBe(false);
});

test('updateName invalid data', async () => {
  expect.assertions(4);

  const name = 'Spot';
  const is_male = true
  const result = await knex('pet_names').insert({ name, is_male }, ['id']);
  const id = result[0].id;

  try {
    await nameQueries.updateName({ id, foo: 'Bar' });
  } catch (error) {
    expect(error.msg).toBe('Invalid name fields');
  }

  const nameRecord = await knex('pet_names').first();
  expect(nameRecord.id).toBe(id);
  expect(nameRecord.name).toBe(name);
  expect(nameRecord.is_male).toBe(is_male);
});

test('updateName not found', async () => {
  expect.assertions(1);

  try {
    await nameQueries.updateName({ id: 999, name: 'Spot', is_male: true });
  } catch (error) {
    expect(error.msg).toBe('Name not found');
  }
});

test('deleteName valid id', async () => {
  const result = await knex('pet_names').insert({ name: 'Spot', is_male: true }, ['id']);
  const id = result[0].id;

  await nameQueries.deleteName(id);

  const nameRecords = await knex('pet_names').where({ id });
  expect(nameRecords.length).toBe(0);
});

test('deleteName not found', async () => {
  expect.assertions(1);

  try {
    await nameQueries.deleteName(999);
  } catch (error) {
    expect(error.msg).toBe('Name not found');
  }
});
