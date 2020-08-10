import knex from 'knex';

export async function up(knex: knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('public.users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.timestamp('create_at')
        .defaultTo('now')
        .notNullable();

    })
}

export async function down(knex: knex) {
    knex.schema.dropTable('connections');
}