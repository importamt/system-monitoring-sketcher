const webpack = require("webpack");
module.exports = ({config}) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve("babel-loader"),
                options: {
                    presets: [["react-app", {flow: false, typescript: true}]],
                },
            },
            require.resolve("react-docgen-typescript-loader"),
        ],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    config.plugins.push(new webpack.ProvidePlugin({
        'React': 'react',
    }));

    return config;
};

