var path = require('path');

module.exports = {
    entry: {
        site: [
            './scripts/Main.tsx'
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'wwwroot/dist/')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/
                //,use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },

    devtool: "source-map"
};