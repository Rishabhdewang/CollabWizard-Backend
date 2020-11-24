
exports.up = function(knex) {
    return knex.schema.createTable("teacher",(table) => {
        table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
        table.string('username').unique();
        table.string('fullname');
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.text('bio');
        table.string('designation');
        table.string('profileImageUrl');
    })
   
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("teacher");
};
