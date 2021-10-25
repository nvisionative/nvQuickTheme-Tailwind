const cssnano = require('cssnano');

module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        cssnano(){preset: 'default'}
    }
}