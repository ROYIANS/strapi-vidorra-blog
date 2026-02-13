import {
  LayoutDashboard,
  Users,
  Command,
} from 'lucide-react'
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
      title: 'Management',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users,
        },
      ],
    },
  ],
}
