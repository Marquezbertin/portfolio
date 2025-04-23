const path = require('path');

module.exports = {
    entry: './src/index.js', // Caminho de entrada do seu arquivo principal
    output: {
        filename: 'bundle.js', // Nome do arquivo de saída
        path: path.resolve(__dirname, 'dist'), // Diretório de saída
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Usar Babel para transpilar o código
                },
            },
            {
                test: /\.wasm$/,
                type: 'webassembly/async', // Suporte para arquivos .wasm
            },
        ],
    },
    experiments: {
        asyncWebAssembly: true, // Habilitar WebAssembly experimental
    },
};