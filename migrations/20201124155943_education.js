
exports.up = function(knex) {
    return knex.schema.createTable("education",(table3) =>{
        table3.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
        table3.uuid("teacherId").references("id").inTable("teacher").notNullable().onDelete('CASCADE');
        table3.string("school");
        table3.string("degree");
        table3.string("fieldOfStudy");
        table3.date("startYear");
        table3.date("endYear");
        table3.text("activities");
        table3.string('eduLogoUrl');
        // table3.string("uploads");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("education")
};
