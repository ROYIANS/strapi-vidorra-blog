export interface ThemeConfig extends Record<string, unknown> {
  theme: string,
  theme_color: string,
  favicon: string,
  favicon16: string,
  favicon32: string,
  appleTouchIcon: string,
  maskicon: string,
  manifest: string,
  logo: string,
  avatar: string,
  header: {
    showLogo: boolean,
    showTitle: boolean,
    description: {
      type: string,
      content: string
    }
  },
  home: {
    stickyThread: [
      ...{
        uniqueId: string,
        title?: string,
        cover?: string,
        description?: string
      }
    ]
  },
  me: {
    nickname: string,
    description: string,
    birthYear: string,
    location: string
    avatar: string
  }
  pagination: {
    per_page: number,
    order_by: string
  },
  head: {
    links: object[],
    scripts: object[]
  },
  nav: [
    ...{
      title: string,
      icon: string,
      url: string
    },
    ...{
      group: boolean,
      name: string
    }
  ],
  links: [
    ...{
      title: string,
      icon?: string,
      url: string
    }
  ],
  announcement: {
    enable: boolean,
    title: string,
    type: string,
    closable: boolean,
    icon: string,
    content: string
  },
  friends: {
    name: string,
    background: string,
    description: string
  },
  secrets: {
    qweather_api_key?: string
  }
}
