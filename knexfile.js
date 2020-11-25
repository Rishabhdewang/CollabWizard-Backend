// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host:"localhost",
      user : "postgres",
      password : "postgres",
      database : 'CollabWizard'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,       // Change these with your own database connection URL.
    migrations: {
      directory: './src/migrations'
    },
    useNullAsDefault: true
  }

};
