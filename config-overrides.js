const { override, fixBabelImports, addWebpackAlias, setWebpackPublicPath, overrideDevServer, watchAll, addWebpackPlugin } = require('customize-cra')
const path = require('path')

module.exports = {
    webpack: override(
        setWebpackPublicPath('./'),
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css'
        }),
        addWebpackAlias({
            ['@']: path.resolve(__dirname, 'src')
        }),
        (config) => {
            config.devtool = 'cheap-module-source-map'
            return config
        }),
    devServer: overrideDevServer(
        watchAll(),
        (config) => {
            return config
        }
    )
}
