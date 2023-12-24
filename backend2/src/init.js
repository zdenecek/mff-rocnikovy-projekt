require("dotenv").config();

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/matrika";
require("./mongoose")(dbUrl);


