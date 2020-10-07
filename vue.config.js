module.exports = {
    outputDir: "dist",   //build输出目录
    assetsDir: "assets", //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: "8181",
        https: false,   //是否使用https协议
        hotOnly: true, //是否开启热更新
        proxy: {
            '/api': {
                //target: 'http://192.168.52.129:8081',
                target:'http://127.0.0.1:8081',
                changOrigin: true, //允许跨域
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    }
};
