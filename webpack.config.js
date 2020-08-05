const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        broadcaster: path.join(__dirname, "FrontProjects", "Broadcaster", "src", "main.js"),
        viewer: path.join(__dirname, "FrontProjects", "Viewer", "src", "main.js")
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js"
    },

    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: 'html-loader'
            }
        ]
    }

};
