const PRODUCTION = 'production'
const DEVELOPMENT = 'development'

const isProduction = process.env.NODE_ENV === PRODUCTION

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    mode: isProduction ? PRODUCTION : DEVELOPMENT,
    entry: './index.ts',
    output: {
        path: `${__dirname}/dist/`,
        library: 'SystemMonitoringSketcher',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json']
                },
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    devtool: isProduction ? undefined : 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin()
    ]
}