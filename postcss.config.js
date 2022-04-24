const cssnano = require('cssnano');

module.exports = {
    plugins: {
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {},
        cssnano() {
            return {
                preset: 'default',
            };
        }
    }
}