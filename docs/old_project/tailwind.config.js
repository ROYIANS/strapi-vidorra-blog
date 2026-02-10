/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    darkMode: 'class',
    theme: {
        textShadow: {},
        screens: {
            '4xl': {'min': '2500px'},
            '3xl': {'min': '1900px'},
            '2xl': {'min': '1535px'},
            'xl': {'max': '1279px'},
            'lg': {'max': '1023px'},
            'md': {'max': '767px'},
            'sm': {'max': '639px'}
        },
        extend: {
            colors: {
                'background': {
                    DEFAULT: '#f0f0f0',
                    dark: '#222222'
                },
                'page-bg': {
                    DEFAULT: '#fafafa',
                    dark: '#161616'
                },
                'main-text': {
                    DEFAULT: '#212121',
                    dark: '#ffffff'
                },
                'border-color': {
                    DEFAULT: '#eee',
                    dark: '#262626'
                },
                'theme-blue': '#0084FF',
                'theme-red': '#FF3842',
                'theme-pink': '#d44040',
                'theme-green': '#3e9f50',
                'theme-yellow': '#ffc93e',
                'theme-orange': '#ff953e',
                'default-theme': {
                    DEFAULT: '#f0f0f0',
                    background: '#fffcf5',
                    sideline: '#699054',
                    primary: '#699054',
                    'primary-900': '#779a66',
                    'primary-800': '#84a476',
                    'primary-700': '#92ae85',
                    'primary-600': '#a0b894',
                    'primary-500': '#adc2a3',
                    'primary-400': '#bbcdb3',
                    'primary-300': '#c8d7c2',
                    'primary-200': '#d6e1d1',
                    'primary-100': '#e4ebe0',
                    'primary-dark-100': '#5f834f',
                    'primary-dark-200': '#567647',
                    'primary-dark-300': '#4c693f',
                    'primary-dark-400': '#435c37',
                    'primary-dark-500': '#394f2f',
                    'primary-dark-600': '#304128',
                    'primary-dark-700': '#263420'
                }
            },
            minHeight: {
                '0': '0',
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
                '4/5': '80%',
                '17/20': '85%',
                '9/10': '90%',
                '19/20': '95%',
                'full': '100%',
                '10': '10rem',
                '20': '20rem',
                '30': '30rem',
                '40': '40rem',
                '50': '50rem',
                '80': '80rem'
            },
            zIndex: {
                '-100': -100,
                '-20': -20,
                '-10': -10,
                '-3': -3,
                '-2': -2,
                '-1': -1,
                '-0': -0,
                '0': 0,
                '1': 1,
                '2': 2,
                '3': 3,
                '10': 10,
                '20': 20,
                '30': 30,
                '40': 40,
                '50': 50,
                '100': 100,
                '999': 999,
                '9999': 9999,
                '99999': 99999,
                '999999': 999999,
                '2147483646': 2147483646,
                'auto': 'auto',
            },
            boxShadow: {
                'type1': 'rgba(100, 100, 111, 0.2) 0 7px 29px 0'
            },
            keyframes: {
                'default-mask-mt': {
                    from: {
                        transform: 'translateY(-100%)'
                    },
                    to: {
                        transform: 'none'
                    }
                },
                'default-mask-mb': {
                    from: {
                        transform: 'translateY(100%)'
                    },
                    to: {
                        transform: 'none'
                    }
                },
                'default-mask-ml': {
                    from: {
                        transform: 'translateX(-100%)'
                    },
                    to: {
                        transform: 'none'
                    }
                },
                'default-mask-mr': {
                    from: {
                        transform: 'translateX(100%)'
                    },
                    to: {
                        transform: 'none'
                    }
                },
                'default-left-in': {
                    '0%': {
                        translate: '-3vw 0',
                        opacity: '0'
                    },
                    '100%': {
                        translate: 'none',
                        opacity: 1
                    }
                },
                'default-fade-out': {
                    '0%': {
                        opacity: 1
                    },
                    '100%': {
                        opacity: 0
                    }
                }
            },
            animation: {
                'default-mask-mt': 'default-mask-mt calc(4 * var(--duration)) var(--curve) both',
                'default-mask-mb': 'default-mask-mb calc(4 * var(--duration)) var(--curve) both',
                'default-mask-ml': 'default-mask-ml calc(4 * var(--duration)) var(--curve) both',
                'default-mask-mr': 'default-mask-mr calc(4 * var(--duration)) var(--curve) both',
                'default-left-in': 'default-left-in calc(2 * var(--duration)) var(--curve) both',
                'default-fade-out': 'default-fade-out calc(2 * var(--duration)) var(--curve) both'
            }
        },
    },
    variants: {
        extend: {
            backgroundColor: ['dark'],
            textColor: ['dark'],
        },
    },
    plugins: [
        require('tailwindcss-3d'),
        require('@tailwindcss/typography')({
            // all these options default to the values specified here
            ellipsis: true,         // whether to generate ellipsis utilities
            hyphens: true,          // whether to generate hyphenation utilities
            kerning: true,          // whether to generate kerning utilities
            textUnset: true,        // whether to generate utilities to unset text properties
            componentPrefix: 'c-',  // the prefix to use for text style classes
        })
    ]
}

