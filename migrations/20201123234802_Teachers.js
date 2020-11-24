
exports.up = function(knex) {
    return knex.schema.createTable("Teachers",(table) => {
        table.uuid("teachersId").defaultTo(knex.raw("uuid_generate_v4()")).primary();
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
    return knex.schema.dropTableIfExists("Teachers");
};
