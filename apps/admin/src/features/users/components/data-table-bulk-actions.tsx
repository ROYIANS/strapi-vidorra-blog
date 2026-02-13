import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { type Table } from '@tanstack/react-table'
import { Trash2, UserCheck, UserX } from 'lucide-react'
import { toast } from 'sonner'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAuthProfile } from '@/hooks/use-auth-profile'
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
  const selectedRows = table.getFilteredSelectedRowModel().rows

  if (currentUser?.role !== 'ADMIN') {
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
        `${status === 'active' ? 'Activated' : 'Deactivated'} ${successCount} user${successCount > 1 ? 's' : ''}`
      )
    }

    if (failureCount > 0) {
      toast.error(
        `${failureCount} update(s) failed. Please retry or check permissions.`
      )
    }
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='user'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('active')}
              className='size-8'
              aria-label='Activate selected users'
              title='Activate selected users'
              disabled={updatingStatus !== null}
            >
              <UserCheck />
              <span className='sr-only'>Activate selected users</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Activate selected users</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              onClick={() => handleBulkStatusChange('inactive')}
              className='size-8'
              aria-label='Deactivate selected users'
              title='Deactivate selected users'
              disabled={updatingStatus !== null}
            >
              <UserX />
              <span className='sr-only'>Deactivate selected users</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Deactivate selected users</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Delete selected users'
              title='Delete selected users'
              disabled={updatingStatus !== null}
            >
              <Trash2 />
              <span className='sr-only'>Delete selected users</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete selected users</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <UsersMultiDeleteDialog
        table={table}
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      />
    </>
  )
}
