import type { Permission } from '@/lib/permissions'
import type { NavCollapsible, NavGroup, NavItem, NavLink } from '../types'

function canAccess(granted: Set<string>, required?: Permission[]) {
  if (!required || required.length === 0) return true
  return required.every((permission) => granted.has(permission))
}

function filterNavItem(item: NavItem, granted: Set<string>): NavItem | null {
  if (!canAccess(granted, item.permissions)) return null

  if (!('items' in item) || !item.items) {
    return item as NavLink
  }

  const subItems = item.items.filter((subItem) =>
    canAccess(granted, subItem.permissions)
  )

  if (subItems.length === 0) return null
  return { ...(item as NavCollapsible), items: subItems }
}

export function filterNavGroupsByPermissions(
  groups: NavGroup[],
  grantedPermissions: string[]
) {
  const granted = new Set(grantedPermissions)

  return groups
    .map((group) => ({
      ...group,
      items: group.items
        .map((item) => filterNavItem(item, granted))
        .filter((item): item is NavItem => item !== null),
    }))
    .filter((group) => group.items.length > 0)
}
