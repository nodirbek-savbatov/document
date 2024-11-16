export const databaseConfig = () => ({
  database: {
    port: parseInt(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});
