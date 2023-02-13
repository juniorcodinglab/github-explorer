const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWPPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'; 
module.exports = {
    // converter o código em modo de desenvolvimento
    // + rápido
    // - otimização
    mode: isDevelopment ? 'development' : 'production',
    // Quando printar um erro na tela, vc saberá exatamente onde estará o erro!!
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    // arquivo principal da aplicação
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    // saída
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // quais arquivos o webpack deve converter
    // vc não precisa colocar o formato do arquivo nas importações do react
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    // yarn webpack serve
    // Faz o processamento automático ao atualizar arquivos da aplicação
    devServer: {
        static: {
            directory: path.join(__dirname, "public/"),
        },
        port: 8000,
        devMiddleware: {
            publicPath: "https://localhost:3000/dist/",
        },
        hot: true,
    },
    // Criar um HTML automático na pasta /dist
    plugins: [
        isDevelopment && new ReactRefreshWPPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }, 
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}