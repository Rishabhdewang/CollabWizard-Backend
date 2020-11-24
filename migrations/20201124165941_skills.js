
exports.up = function(knex) {
    return knex.schema
    .createTable("skills",(table4) =>{
        table4.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
        table4.uuid("teacherId").references("id").inTable("teacher").notNullable().onDelete('CASCADE');
        table4.string("skillName");
    })
    .createTable("interests",(table5) =>{
        table5.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
        table5.uuid("teacherId").references("id").inTable("teacher").notNullable().onDelete('CASCADE');
        table5.string("interestIn");
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("skills")
    .dropTableIfExists("interests");
};


