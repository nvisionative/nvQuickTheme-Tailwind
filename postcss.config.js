const cssnano = require('cssnano');

module.exports = {
    plugins: {
        'postcss-import': {},
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        cssnano() {
            return {
                preset: 'default',
            };
        }
    }
}