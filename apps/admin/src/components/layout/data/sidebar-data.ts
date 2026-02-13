import {
  LayoutDashboard,
  Users,
  Command,
} from 'lucide-react'
import { t } from '@/i18n'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  teams: [
    {
      name: 'Vidorra Admin',
      logo: Command,
      plan: 'Clerk + NestJS',
    },
  ],
  navGroups: [
    {
      title: t('nav.management'),
      items: [
        {
          title: t('nav.dashboard'),
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: t('nav.users'),
          url: '/users',
          icon: Users,
        },
      ],
    },
  ],
}
