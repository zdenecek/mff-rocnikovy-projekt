require("dotenv").config();

module.exports = {
  "development": {
    "use_env_variable": "DB_URL",
    "dialect": "mysql"
  },
  "test": {
    "use_env_variable": "DB_URL",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "DB_URL",
    "dialect": "mysql"
  }
}
