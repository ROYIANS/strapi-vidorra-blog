import { vidorraTheme } from './themes'
import { generateTailwindTheme } from './theme-engine'

/**
 * Vidorra Tailwind 预设
 * 提供完整的设计系统配置
 */
export const vidorraTailwindPreset = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'default-theme': generateTailwindTheme(vidorraTheme.colors.light),
            },
            fontFamily: {
                sans: vidorraTheme.fonts?.sans.split(',') || [],
                serif: vidorraTheme.fonts?.serif.split(',') || [],
                mono: vidorraTheme.fonts?.mono.split(',') || [],
            },
            // 响应式断点（与old_project保持一致）
            screens: {
                '4xl': { min: '2500px' },
                '3xl': { min: '1900px' },
                '2xl': { min: '1535px' },
                'xl': { max: '1279px' },
                'lg': { max: '1023px' },
                'md': { max: '767px' },
                'sm': { max: '639px' },
            },
            // 扩展动画
            keyframes: {
                'mask-mt': {
                    from: { transform: 'translateY(-100%)' },
                    to: { transform: 'none' },
                },
                'mask-mb': {
                    from: { transform: 'translateY(100%)' },
                    to: { transform: 'none' },
                },
                'mask-ml': {
                    from: { transform: 'translateX(-100%)' },
                    to: { transform: 'none' },
                },
                'mask-mr': {
                    from: { transform: 'translateX(100%)' },
                    to: { transform: 'none' },
                },
                'left-in': {
                    '0%': { translate: '-3vw 0', opacity: '0' },
                    '100%': { translate: 'none', opacity: '1' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                'mask-mt': 'mask-mt calc(4 * var(--duration)) var(--curve) both',
                'mask-mb': 'mask-mb calc(4 * var(--duration)) var(--curve) both',
                'mask-ml': 'mask-ml calc(4 * var(--duration)) var(--curve) both',
                'mask-mr': 'mask-mr calc(4 * var(--duration)) var(--curve) both',
                'left-in': 'left-in calc(2 * var(--duration)) var(--curve) both',
                'fade-in': 'fade-in 0.3s ease both',
            },
            // 扩展 minHeight
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
                '80': '80rem',
            },
            // 扩展 zIndex
            zIndex: {
                '-100': '-100',
                '-20': '-20',
                '-10': '-10',
                '-3': '-3',
                '-2': '-2',
                '-1': '-1',
                '0': '0',
                '1': '1',
                '2': '2',
                '3': '3',
                '10': '10',
                '20': '20',
                '30': '30',
                '40': '40',
                '50': '50',
                '100': '100',
                '999': '999',
                '9999': '9999',
                '99999': '99999',
                '999999': '999999',
                '2147483646': '2147483646',
            },
            boxShadow: {
                'type1': 'rgba(100, 100, 111, 0.2) 0 7px 29px 0',
            },
        },
    },
}

export default vidorraTailwindPreset
