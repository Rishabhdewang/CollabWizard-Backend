
exports.up = function(knex) {
    return knex.schema.createTable("experience",(table2) =>{
        table2.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
        table2.uuid("teacherId").references("id").inTable("teacher").onDelete('CASCADE');
        table2.string("title");
        table2.string("employmentType");
        table2.string("company");
        table2.string("location");
        table2.string("startMonth");
        table2.string("startYear");
        table2.string("endMonth");
        table2.string("endYear");
        table2.boolean("present").defaultTo(false).notNullable();
        table2.text("description");
        table2.string('expLogoUrl');
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("experience")
  
};
