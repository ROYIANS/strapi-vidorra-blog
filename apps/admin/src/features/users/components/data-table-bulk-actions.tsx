import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { type Table } from '@tanstack/react-table'
import { Trash2, UserCheck, UserX } from 'lucide-react'
import { toast } from 'sonner'
import { t } from '@/i18n'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAuthProfile } from '@/hooks/use-auth-profile'
import { PERMISSIONS } from '@/lib/permissions'
import { usersService } from '@/services/users.service'
import { type User } from '../data/schema'
import { UsersMultiDeleteDialog } from './users-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState<'active' | 'inactive' | null>(
    null
  )
  const queryClient = useQueryClient()
  const { data: currentUser } = useAuthProfile()
  const granted = currentUser?.permissions ?? []
  const canUpdateUser = granted.includes(PERMISSIONS.USERS_UPDATE)
  const canDeleteUser = granted.includes(PERMISSIONS.USERS_DELETE)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  if (!canUpdateUser && !canDeleteUser) {
    return null
  }

  const handleBulkStatusChange = async (status: 'active' | 'inactive') => {
    const selectedUsers = selectedRows.map((row) => row.original as User)
    if (selectedUsers.length === 0) return

    setUpdatingStatus(status)
    const isActive = status === 'active'
    const results = await Promise.allSettled(
      selectedUsers.map((user) =>
        usersService.updateUser(user.id, {
          isActive,
        })
      )
    )
    setUpdatingStatus(null)

    const successCount = results.filter((result) => result.status === 'fulfilled').length
    const failureCount = results.length - successCount

    if (successCount > 0) {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
      table.resetRowSelection()
      toast.success(
        status === 'active'
          ? t('users.bulk.activated', { count: successCount })
          : t('users.bulk.deactivated', { count: successCount })
      )
    }

    if (failureCount > 0) {
      toast.error(t('users.bulk.updateFailed', { count: failureCount }))
    }
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName={t('users.entityName')}>
        {canUpdateUser && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                onClick={() => handleBulkStatusChange('active')}
                className='size-8'
                aria-label={t('users.bulk.activateSelected')}
                title={t('users.bulk.activateSelected')}
                disabled={updatingStatus !== null}
              >
                <UserCheck />
                <span className='sr-only'>{t('users.bulk.activateSelected')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('users.bulk.activateSelected')}</p>
            </TooltipContent>
          </Tooltip>
        )}

        {canUpdateUser && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                onClick={() => handleBulkStatusChange('inactive')}
                className='size-8'
                aria-label={t('users.bulk.deactivateSelected')}
                title={t('users.bulk.deactivateSelected')}
                disabled={updatingStatus !== null}
              >
                <UserX />
                <span className='sr-only'>{t('users.bulk.deactivateSelected')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('users.bulk.deactivateSelected')}</p>
            </TooltipContent>
          </Tooltip>
        )}

        {canDeleteUser && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='destructive'
                size='icon'
                onClick={() => setShowDeleteConfirm(true)}
                className='size-8'
                aria-label={t('users.bulk.deleteSelected')}
                title={t('users.bulk.deleteSelected')}
                disabled={updatingStatus !== null}
              >
                <Trash2 />
                <span className='sr-only'>{t('users.bulk.deleteSelected')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('users.bulk.deleteSelected')}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </BulkActionsToolbar>

      <UsersMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
