
exports.up = async function(knex) {
    await knex.schema.createTable("zoos", (table) => {
        table.increments("id")
        table.string("name").notNullable()
        table.string("address").notNullable()
    })

    await knex.schema.createTable("species", (table) => {
        table.increments("id")
        table.string("name").notNullable()
    })

    await knex.schema.createTable("animals", (table) => {
        table.increments("id")
        table.string("name").notNullable()
        table.integer("species_id")
            .notNullable()
            .references("id")
            .inTable("species")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
    })

    await knex.schema.createTable("zoos_animals", (table) => {
        table.integer("zoo_id")
            .notNullable()
            .references("id")
            .inTable("zoos")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table.integer("animal_id")
            .notNullable()
            .references("id")
            .inTable("animals")
            .onDelete("CASCADE")
            .onUpdate("CASCADE")
        table.date("from")
        table.date("to")
        table.primary(["zoo_id", "animal_id"])
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("zoos_animals")
    await knex.schema.dropTableIfExists("animals")
    await knex.schema.dropTableIfExists("species")
    await knex.schema.dropTableIfExists("zoos")
};
