const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#264796',
                            '@secondary-color': '#E2EFEC',
                            '@primary-grey': '#F2ECED',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};