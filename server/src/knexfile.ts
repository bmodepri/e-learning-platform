import path from 'path';

module.exports = {
        client: 'pg',
        version: '12.1',
        connection: {
          host : '127.0.0.1',
          user : 'postgres',
          password : 'postgres',
          database : 'postgres'
        },
        migrations: {
            directory: path.resolve(__dirname, 'database', 'migrations'),
            schemaName: "public"
        },
        useNullAsDefault : true
};