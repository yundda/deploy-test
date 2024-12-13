require("dotenv").config();

/*

{
  "development": {
    "username": "sesac",
    "password": "1111",
    "database": "sesac",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

*/

const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: "mysql",
};
const test = {};
const production = {
  username: process.env.DB_PROD_USERNAME,
  password: process.env.DB_PROD_PASSWORD,
  database: process.env.DB_PROD_DATABASE,
  host: process.env.DB_PROD_HOST,
  dialect: "mysql",
};

module.exports = { development, production };

// env 쓸거면 이렇게 js 파일 생성! json은 .git ignore에!
