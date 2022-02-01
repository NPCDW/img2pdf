const cdnPrefix = "//cdn.jsdelivr.net/npm/"
// const cdnPrefix = "//unpkg.zhimg.com/"
// const cdnPrefix = "//unpkg.com/"

const cdn = {
    css: [
        cdnPrefix + "element-ui@2.15.6/lib/theme-chalk/index.css",
    ],
    js: [
        cdnPrefix + "vue@2.6.11/dist/vue.min.js",
        cdnPrefix + "element-ui@2.15.6/lib/index.js",
        cdnPrefix + "jspdf@2.5.0/dist/jspdf.umd.min.js",
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
            "element-ui": "ELEMENT",
            "jspdf": "jspdf",
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
            title: '图片转PDF',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
            cdn: cdn
        }
    }
}