exports.up = function (knex) {
    return knex.schema
        .createTable("post", function (table) {
            table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
            table.uuid("teacherId").references("id").inTable("teacher").onDelete('CASCADE');
            table.text("postContent");
            table.string("postContentUrl");
            table.string("postUrl");
            table.boolean("isAnonymous").notNullable().defaultTo(false);
            table.timestamps(false, true);
        })
        .createTable("like", function (table) {
            table.uuid("postId").references("id").inTable("post").onDelete("CASCADE");
            table.uuid("teacherId").references("id").inTable("teacher").onDelete('CASCADE');
            table.boolean("isLike").defaultTo(false);
            table.timestamps(false, true);
        })
        .createTable("comment", function (table) {
            table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
            table.uuid("postId").references("id").inTable("post").onDelete("CASCADE");
            table.uuid("teacherId").references("id").inTable("teacher").onDelete('CASCADE');
            table.text("commentText");
            table.timestamps(false, true);
        })
        .createTable("reply", function (table) {
            table.uuid("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
            table.uuid("postId").references("id").inTable("post").onDelete("CASCADE");
            table
                .uuid("commentId")
                .references("id")
                .inTable("comment")
                .onDelete("CASCADE");
            table.uuid("teacherId").references("id").inTable("teacher").onDelete('CASCADE');
            table.text("replyText");
            table.timestamps(false, true);
        });
};

exports.down = function (knex) {

    knex.schema
    .dropTableIfExists("reply")
    .dropTableIfExists("comment")
    .dropTableIfExists("like")
    .dropTableIfExists("post")
};