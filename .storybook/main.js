module.exports = {
    core: {
        builder: "webpack5",
    },
    stories: [
        "../src/**/*.stories.mdx",
        "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
        "../src/pages/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials"
    ],

    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            compilerOptions: {
                allowSyntheticDefaultImports: false,
                esModuleInterop: false,
            },
        }
    },
}