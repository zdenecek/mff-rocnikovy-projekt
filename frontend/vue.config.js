const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
                "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Access-Control-Allow-Private-Network": "True",
            "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",
        },
    },
});
