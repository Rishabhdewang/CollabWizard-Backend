
exports.up = async function(knex) {
  await knex.schema.createTable('networks',function(table){
    table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
    table.uuid("teacherId").references("id").inTable("teacher").onDelete('CASCADE');
    table.uuid("networkId").references("id").inTable("teacher").onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  
};
