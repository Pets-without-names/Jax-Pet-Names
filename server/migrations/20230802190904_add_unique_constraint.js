/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('pet_names', function (table) {
    table.unique('name');
    table.dropNullable('name');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('pet_names', function (table) {
    table.dropUnique('name');
    table.setNullable('name');
  });
};
