const mongoose = require("mongoose");

module.exports = async () => {
    const connectionParams = {};
    if (process.env.USE_DB_AUTH === "true") {
        connectionParams.user = process.env.MONGO_USERNAME;
        connectionParams.pass = process.env.MONGO_PASSWORD;
    }
    await mongoose.connect(process.env.MONGO_CONN_STR, connectionParams);
    console.log("Connected to database.");
};
