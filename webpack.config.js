const path = require('path');

module.exports = {
    entry: './src/index.js', // Caminho relativo para o script de entrada
    output: {
        path: path.resolve(__dirname, 'dist'), // Caminho relativo para a pasta de saída
        filename: 'bundle.js',
    },
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