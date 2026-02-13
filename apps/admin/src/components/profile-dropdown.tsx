import { Link } from '@tanstack/react-router'
import { useUser } from '@clerk/clerk-react'
import { t } from '@/i18n'
import { useAuthProfile } from '@/hooks/use-auth-profile'
import useDialogState from '@/hooks/use-dialog-state'
import { PERMISSIONS } from '@/lib/permissions'
import { SignOutDialog } from '@/components/sign-out-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ProfileDropdown() {
  const [open, setOpen] = useDialogState()
  const { user } = useUser()
  const { data: authProfile } = useAuthProfile()
  const canViewUsers = (authProfile?.permissions ?? []).includes(
    PERMISSIONS.USERS_VIEW
  )
  const displayName =
    authProfile?.name ?? authProfile?.username ?? user?.fullName ?? t('auth.guest')
  const displayEmail = authProfile?.email ?? user?.primaryEmailAddress?.emailAddress ?? ''
  const displayAvatar = authProfile?.avatar ?? user?.imageUrl ?? ''
  const initials = displayName.trim().slice(0, 2).toUpperCase()

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={displayAvatar} alt='profile-avatar' />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col gap-1.5'>
              <p className='text-sm leading-none font-medium'>{displayName}</p>
              <p className='text-xs leading-none text-muted-foreground'>
                {displayEmail}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to='/settings/account'>
                {t('nav.settingsMenu')}
                <DropdownMenuShortcut>Ctrl+P</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            {canViewUsers && (
              <DropdownMenuItem asChild>
                <Link to='/users'>
                  {t('nav.users')}
                  <DropdownMenuShortcut>Ctrl+U</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link to='/'>
                {t('nav.dashboard')}
                <DropdownMenuShortcut>Ctrl+D</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive' onClick={() => setOpen(true)}>
            {t('nav.signOut')}
            <DropdownMenuShortcut className='text-current'>
              Ctrl+Q
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  )
}
