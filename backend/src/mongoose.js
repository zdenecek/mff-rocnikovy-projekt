

function init(app) {
    const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017/matrika";
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl);
}

module.exports =  { init } ;