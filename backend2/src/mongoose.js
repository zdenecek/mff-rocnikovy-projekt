

function initMongoose(dbUrl) {

    const mongoose = require("mongoose");
    mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl);
}

module.exports =  initMongoose ;