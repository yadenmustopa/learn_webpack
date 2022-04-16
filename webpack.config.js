const path= require("path");

const config = {
    entry : "./src/app.js",
    output : { 
        path : path.resolve(__dirname,"dist"),
        filename : "bundle.js",
    }

}


module.exports = config;