export type ThemeColorName =
  | 'default'
  | 'red'
  | 'yellow'
  | 'blue'
  | 'green'
  | 'brown'
  | 'orange'

export interface ThemeColorScheme {
  name: ThemeColorName
  label: string
  light: {
    primary: string
    primaryForeground: string
    ring: string
    sidebar?: string
    sidebarAccent?: string
    sidebarBorder?: string
  }
  dark: {
    primary: string
    primaryForeground: string
    ring: string
    sidebar?: string
    sidebarAccent?: string
    sidebarBorder?: string
  }
}

export const themeColors: Record<ThemeColorName, ThemeColorScheme> = {
  default: {
    name: 'default',
    label: 'Neutral',
    light: {
      primary: 'oklch(0.208 0.042 265.755)',
      primaryForeground: 'oklch(0.984 0.003 247.858)',
      ring: 'oklch(0.704 0.04 256.788)',
      sidebar: 'oklch(0.965 0.001 286)',
      sidebarAccent: 'oklch(0.95 0.001 286)',
      sidebarBorder: 'oklch(0.91 0.003 286)',
    },
    dark: {
      primary: 'oklch(0.929 0.013 255.508)',
      primaryForeground: 'oklch(0.208 0.042 265.755)',
      ring: 'oklch(0.551 0.027 264.364)',
      sidebar: 'oklch(0.15 0.006 286)',
      sidebarAccent: 'oklch(0.20 0.006 286)',
      sidebarBorder: 'oklch(0.24 0.006 286)',
    },
  },
  red: {
    name: 'red',
    label: 'Red',
    light: {
      primary: 'oklch(0.59 0.18 25)',
      primaryForeground: 'oklch(0.984 0.003 247.858)',
      ring: 'oklch(0.72 0.15 25)',
      sidebar: 'oklch(0.965 0.008 25)',
      sidebarAccent: 'oklch(0.95 0.012 25)',
      sidebarBorder: 'oklch(0.91 0.010 25)',
    },
    dark: {
      primary: 'oklch(0.75 0.15 25)',
      primaryForeground: 'oklch(0.208 0.042 265.755)',
      ring: 'oklch(0.65 0.13 25)',
      sidebar: 'oklch(0.15 0.015 25)',
      sidebarAccent: 'oklch(0.20 0.020 25)',
      sidebarBorder: 'oklch(0.24 0.018 25)',
    },
  },
  yellow: {
    name: 'yellow',
    label: 'Yellow',
    light: {
      primary: 'oklch(0.82 0.14 85)',
      primaryForeground: 'oklch(0.208 0.042 265.755)',
      ring: 'oklch(0.88 0.12 85)',
      sidebar: 'oklch(0.965 0.008 85)',
      sidebarAccent: 'oklch(0.95 0.012 85)',
      sidebarBorder: 'oklch(0.91 0.010 85)',
    },
    dark: {
      primary: 'oklch(0.85 0.13 85)',
      primaryForeground: 'oklch(0.208 0.042 265.755)',
      ring: 'oklch(0.78 0.11 85)',
      sidebar: 'oklch(0.15 0.015 85)',
      sidebarAccent: 'oklch(0.20 0.020 85)',
      sidebarBorder: 'oklch(0.24 0.018 85)',
    },
  },
  blue: {
    name: 'blue',
    label: 'Blue',
    light: {
      primary: 'oklch(0.61 0.18 250)',
      primaryForeground: 'oklch(0.984 0.003 247.858)',
      ring: 'oklch(0.74 0.15 250)',
      sidebar: 'oklch(0.965 0.008 250)',
      sidebarAccent: 'oklch(0.95 0.012 250)',
      sidebarBorder: 'oklch(0.91 0.010 250)',
    },
    dark: {
      primary: 'oklch(0.77 0.16 250)',
      primaryForeground: 'oklch(0.208 0.042 265.755)',
      ring: 'oklch(0.67 0.14 250)',
      sidebar: 'oklch(0.15 0.015 250)',
      sidebarAccent: 'oklch(0.20 0.020 250)',
      sidebarBorder: 'oklch(0.24 0.018 250)',
    },
  },
  green: {
    name: 'green',
    label: 'Green',
    light: {
      primary: 'oklch(0.62 0.15 155)',
      primaryForeground: 'oklch(0.984 0.003 247.858)',
      ring: 'oklch(0.75 0.13 155)',
      sidebar: 'oklch(0.965 0.008 155)',
      sidebarAccent: 'oklch(0.95 0.012 155)',
      sidebarBorder: 'oklch(0.91 0.010 155)',
    },
    dark: {
      primary: 'oklch(0.78 0.14 155)',
      primaryForeground: 'oklch(0.208 0.042 265.755)',
      ring: 'oklch(0.68 0.12 155)',
      sidebar: 'oklch(0.15 0.015 155)',
      sidebarAccent: 'oklch(0.20 0.020 155)',
      sidebarBorder: 'oklch(0.24 0.018 155)',
    },
  },
  brown: {
    name: 'brown',
    label: 'Brown',
    light: {
      primary: 'oklch(0.58 0.11 65)',
      primaryForeground: 'oklch(0.984 0.003 247.858)',
      ring: 'oklch(0.71 0.09 65)',
      sidebar: 'oklch(0.965 0.008 65)',
      sidebarAccent: 'oklch(0.95 0.012 65)',
      sidebarBorder: 'oklch(0.91 0.010 65)',
    },
    dark: {
      primary: 'oklch(0.74 0.10 65)',
      primaryForeground: 'oklch(0.208 0.042 265.755)',
      ring: 'oklch(0.64 0.09 65)',
      sidebar: 'oklch(0.15 0.015 65)',
      sidebarAccent: 'oklch(0.20 0.020 65)',
      sidebarBorder: 'oklch(0.24 0.018 65)',
    },
  },
  orange: {
    name: 'orange',
    label: 'Orange',
    light: {
      primary: 'oklch(0.69 0.20 40)',
      primaryForeground: 'oklch(0.984 0.003 247.858)',
      ring: 'oklch(0.80 0.17 40)',
      sidebar: 'oklch(0.965 0.008 40)',
      sidebarAccent: 'oklch(0.95 0.012 40)',
      sidebarBorder: 'oklch(0.91 0.010 40)',
    },
    dark: {
      primary: 'oklch(0.82 0.18 40)',
      primaryForeground: 'oklch(0.208 0.042 265.755)',
      ring: 'oklch(0.72 0.16 40)',
      sidebar: 'oklch(0.15 0.015 40)',
      sidebarAccent: 'oklch(0.20 0.020 40)',
      sidebarBorder: 'oklch(0.24 0.018 40)',
    },
  },
}

export function applyThemeColor(colorName: ThemeColorName, theme: 'light' | 'dark') {
  const colors = themeColors[colorName][theme]
  const root = document.documentElement

  root.style.setProperty('--primary', colors.primary)
  root.style.setProperty('--primary-foreground', colors.primaryForeground)
  root.style.setProperty('--ring', colors.ring)
  root.style.setProperty('--color-primary', colors.primary)
  root.style.setProperty('--color-primary-foreground', colors.primaryForeground)
  root.style.setProperty('--color-ring', colors.ring)

  if (colors.sidebar) {
    root.style.setProperty('--sidebar', colors.sidebar)
    root.style.setProperty('--color-sidebar', colors.sidebar)
  }
  if (colors.sidebarAccent) {
    root.style.setProperty('--sidebar-accent', colors.sidebarAccent)
    root.style.setProperty('--color-sidebar-accent', colors.sidebarAccent)
  }
  if (colors.sidebarBorder) {
    root.style.setProperty('--sidebar-border', colors.sidebarBorder)
    root.style.setProperty('--color-sidebar-border', colors.sidebarBorder)
  }
}
