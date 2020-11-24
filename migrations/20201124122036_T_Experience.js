
exports.up = function(knex) {
    return knex.schema.createTable("experience",(table2) =>{
        table2.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
        table2.uuid("teacherId").references("id").inTable("teacher").notNullable().onDelete('CASCADE');
        table2.string("title");
        table2.string("school/college");
        table2.string("location");
        table2.date("startDate");
        table2.date("endDate");
        table2.text("description");
        table2.string('expLogoUrl');
        // table2.string("uploads");
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("experience")
  
};
