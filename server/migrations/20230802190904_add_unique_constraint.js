/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('pet_names', function (table) {
    table.unique('name');
    table.dropNullable('name');
    table.dropNullable('is_male');
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
    table.setNullable('is_male');
  });
};
