import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Trash2, UserPen } from 'lucide-react'
import { t } from '@/i18n'
import { Button } from '@/components/ui/button'
import { useAuthProfile } from '@/hooks/use-auth-profile'
import { PERMISSIONS } from '@/lib/permissions'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type User } from '../data/schema'
import { useUsers } from './users-provider'

type DataTableRowActionsProps = {
  row: Row<User>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useUsers()
  const { data: currentUser } = useAuthProfile()
  const granted = currentUser?.permissions ?? []
  const canUpdateUser = granted.includes(PERMISSIONS.USERS_UPDATE)
  const canDeleteUser = granted.includes(PERMISSIONS.USERS_DELETE)

  if (!canUpdateUser && !canDeleteUser) {
    return null
  }

  const isSelfRow = currentUser?.id === row.original.id

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>{t('users.actions.openMenu')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[160px]'>
          {canUpdateUser && (
            <DropdownMenuItem
              onClick={() => {
                setCurrentRow(row.original)
                setOpen('edit')
              }}
            >
              {t('users.actions.edit')}
              <DropdownMenuShortcut>
                <UserPen size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          {canUpdateUser && canDeleteUser && <DropdownMenuSeparator />}
          {canDeleteUser && (
            <DropdownMenuItem
              onClick={() => {
                if (isSelfRow) return
                setCurrentRow(row.original)
                setOpen('delete')
              }}
              disabled={isSelfRow}
              className='text-red-500!'
            >
              {t('users.actions.delete')}
              <DropdownMenuShortcut>
                <Trash2 size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
