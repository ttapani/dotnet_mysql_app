const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        stats: "verbose",
        entry: { 'main': './ClientApp/boot.tsx' },
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'] },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/'
        },
        module: {
            rules: [
                { test: /\.tsx?$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=false' },
                // { test: /\.tsx?$/, include: /pages/, use: 'awesome-typescript-loader?silent=false' },
                // { test: /\.tsx?$/, include: /navmenu/, use: 'awesome-typescript-loader?silent=false' },
                // { test: /\.tsx?$/, include: /layout/, use: 'awesome-typescript-loader?silent=false' },
                { test: /\.css$/, use: isDevBuild ? ['style-loader', 'typings-for-css-modules-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&namedExport'] : ExtractTextPlugin.extract({ use: 'css-loader?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&namedExport' }) },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new CaseSensitivePathsPlugin()
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('site.css')
        ]),
        devServer: {
            watchOptions: {
              // if you're using Docker you may need this
              aggregateTimeout: 300,
              poll: 1000,
              ignored: /node_modules/
            },
        }
    }];
};