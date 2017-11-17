const path = require('path')

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'kmath.js',
        library: 'kmath',
        libraryTarget: 'umd',
    },
    externals: {
        underscore: {
            commonjs: 'underscore',
            commonjs2: 'underscore',
            amd: 'underscore',
            root: '_',
        },
    },
};
