require("dotenv").config();

module.exports.config = {
  app: {
    port: process.env.PORT,
    host: process.env.HOST,
    salt: process.env.SALT,
  },
  db: {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  },
};
