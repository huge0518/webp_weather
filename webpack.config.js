let path = require("path")

let miniCssExtractPlugin = require("mini-css-extract-plugin")
let htmlWebpackPlugin = require("html-webpack-plugin")

//实例化插件
let mini_css_extract_plugin = new miniCssExtractPlugin({
    filename: "[name]+min.css"
})

let html_webpack_plugin = new htmlWebpackPlugin({
    //要打包的模板路径
    template: "./index.html",
    inject: "body",
    minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
    },
    filename: "index.html"
});
module.exports = {
    mode: "development",

    entry: {
        index: "./js/index.js",
        rem: "./js/rem.js"
    },

    output: {
        path: path.resolve(__dirname + "/build"),
        filename: "[name].min.js"
    },

    module: {
        rules: [

            //处理css
            {
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },

            //处理图片路径
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: [{
                    loader: "url-loader",
                    //图片小于等于1024B
                    options: {
                        limit: 1024
                    }
                }]
            },

            //处理html模板中的图片
            {
                test: /\.html?$/,
                use: [{
                    loader: "html-withimg-loader"
                }]
            }
        ]
    },

    //配置插件
    plugins: [
        mini_css_extract_plugin,
        html_webpack_plugin
    ],

    //配置本地服务
    devServer: {
        //服务器地址
        host: '127.0.0.1',

        //端口
        port: 8001,

        //自动打开浏览器
        // open: true
    }
}