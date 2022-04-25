module.exports = {
  mode: "jit",
  content: [
    '**/*.{ascx,xml,cshtml,txt,html,htm}',
    './src/js/**/*.js'
  ],
  darkMode: 'media',
  theme: {
    fontFamily: {
      'sans': [
        '"Open Sans"',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
    },
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
