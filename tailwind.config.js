module.exports = {
  mode: "jit",
  purge: [
    '**/*.{ascx,xml,cshtml,txt,html,htm}',
    './src/js/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'dnn-red': '#ec3d46',
      'dnn-blue': '#00a5e1',
      'dnn-brown': '#462a2b',
      'light-grey': '#e6e6e6',
      white: '#fff'
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ],
}
