const cdn = {
    css: [
        "//unpkg.zhimg.com/ant-design-vue@1.7.8/dist/antd.min.css"
    ],
    js: [
        "//unpkg.zhimg.com/vue@2.6.11/dist/vue.min.js",
        "//unpkg.zhimg.com/ant-design-vue@1.7.8/dist/antd.min.js",
        "//unpkg.zhimg.com/jspdf@2.5.0/dist/jspdf.es.min.js",
        "//unpkg.zhimg.com/file-saver@2.0.5/dist/FileSaver.min.js",
    ]
}

module.exports = {
    publicPath: './',
    outputDir:"docs",   // 打包时生成的生产环境构建文件的目录
    productionSourceMap: process.env.NODE_ENV !== 'production',
    chainWebpack: config => {
        config.resolve.symlinks(true)
        if (process.env.NODE_ENV === 'production') {
            config.plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end()
        }
    },
    configureWebpack: {
        externals: {
            vue: "Vue",
            "ant-design-vue": "antd",
            "jspdf": "jspdf",
            "file-saver": "saveAs",
            canvg: "canvg",
            html2canvas: "html2canvas",
            dompurify: "dompurify"
        }
    },
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'PDF转图片',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
            cdn: cdn
        }
    }
}