const path = require('path');

module.exports = {
    entry: './src/index.js', // Caminho relativo para o script de entrada
    output: {
        path: path.resolve(__dirname, 'docs'), // Alterar para 'docs'
        filename: 'bundle.js',
    },
    mode: 'production',
    module: { // Corrigido: "module" agora está dentro do objeto principal
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