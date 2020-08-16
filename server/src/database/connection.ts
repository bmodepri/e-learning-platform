import knex from 'knex';

const db = knex({
    client: 'pg',
    version: '12.1',
    connection: {
      host : '127.0.0.1',
      user : 'proffy',
      password : 'proffy',
      database : 'postgres'
    }
});

export default db;