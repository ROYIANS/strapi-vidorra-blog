import { useMemo } from 'react'
import { useLayout } from '@/context/layout-provider'
import { useUser } from '@clerk/clerk-react'
import { t } from '@/i18n'
import { useAuthProfile } from '@/hooks/use-auth-profile'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
// import { AppTitle } from './app-title'
import { filterNavGroupsByPermissions } from './data/filter-nav-by-permissions'
import { sidebarData } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'

export function AppSidebar() {
  const { user } = useUser()
  const { data: authProfile } = useAuthProfile()
  const { collapsible, variant } = useLayout()

  const navGroups = useMemo(
    () =>
      filterNavGroupsByPermissions(
        sidebarData.navGroups,
        authProfile?.permissions ?? []
      ),
    [authProfile?.permissions]
  )

  const sidebarUser = {
    name: user?.fullName ?? user?.username ?? t('auth.guest'),
    email: user?.primaryEmailAddress?.emailAddress ?? '',
    avatar: user?.imageUrl ?? '',
  }

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />

        {/* Replace <TeamSwitch /> with the following <AppTitle />
         /* if you want to use the normal app title instead of TeamSwitch dropdown */}
        {/* <AppTitle /> */}
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
