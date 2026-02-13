export const fontSchemes = [
  {
    id: 'modern',
    name: 'Modern Sans',
    description: 'Outfit + Noto Sans SC',
    preview: 'Modern Design 现代设计',
    className: 'font-modern',
  },
  {
    id: 'serif',
    name: 'Elegant Serif',
    description: 'Noto Serif',
    preview: 'Elegant Style 优雅风格',
    className: 'font-serif',
  },
  {
    id: 'system',
    name: 'System Default',
    description: 'Use OS defaults',
    preview: 'System Font 系统字体',
    className: 'font-system',
  },
] as const

export type FontScheme = (typeof fontSchemes)[number]['id']

export const fonts = fontSchemes.map((scheme) => scheme.id) as unknown as
  readonly FontScheme[]
