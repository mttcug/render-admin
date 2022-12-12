const { override, fixBabelImports, addWebpackAlias, setWebpackPublicPath, overrideDevServer, watchAll } = require('customize-cra')
const path = require('path')
const { config } = require('process')

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
            console.log('-------webpackConf:', config)
            return config
        }
    )
}
