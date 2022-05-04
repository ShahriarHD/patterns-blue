/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./app/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        screens: {
            tablet: '600px',
            desktop: '900px',
        },
        fontFamily: {
            display: ['Noto Serif', ...defaultTheme.fontFamily.serif],
            body: [...defaultTheme.fontFamily.sans],
        },
        zIndex: {
            behind: -1,
            base: 0,
            route: 1,
            route10: 10,
            route20: 20,
            route30: 30,
            route40: 40,
            boom: 100,
            tools: 101,
            modal: 200,
            notification: 201,
            menu: 202,
        },
        colors: {
            gray: {
                100: '#fefefe',
                200: '#e9e9e9',
                300: '#d2d2d2',
                400: '#bababa',
                500: '#9f9f9f',
                600: '#808080',
                700: '#5f5f5f',
                800: '#3d3d3d',
                900: '#1d1d1d',
            },
            blue: colors.sky,
            red: colors.red,
            'black-alpha': {
                100: 'rgba(0,0,0,0.1)',
                200: 'rgba(0,0,0,0.2)',
                300: 'rgba(0,0,0,0.3)',
                400: 'rgba(0,0,0,0.4)',
                500: 'rgba(0,0,0,0.5)',
                600: 'rgba(0,0,0,0.6)',
                700: 'rgba(0,0,0,0.7)',
                800: 'rgba(0,0,0,0.8)',
                900: 'rgba(0,0,0,0.9)',
            },
            'white-alpha': {
                100: 'rgba(255,255,255,0.1)',
                200: 'rgba(255,255,255,0.2)',
                300: 'rgba(255,255,255,0.3)',
                400: 'rgba(255,255,255,0.4)',
                500: 'rgba(255,255,255,0.5)',
                600: 'rgba(255,255,255,0.6)',
                700: 'rgba(255,255,255,0.7)',
                800: 'rgba(255,255,255,0.8)',
                900: 'rgba(255,255,255,0.9)',
            },
            accent: colors.amber,
            black: colors.black,
            white: colors.white,
            transparent: 'transparent',
            current: 'currentColor',
        },
        extend: {
            spacing: {
                128: '32rem',
                144: '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
                '6xl': '3rem'
            }
        },
    },

    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms')
    ],
};
