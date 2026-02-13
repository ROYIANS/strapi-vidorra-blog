'use client'

import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { useQueryClient } from '@tanstack/react-query'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usersService } from '@/services/users.service'

type UserMultiDeleteDialogProps<TData> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<TData>
}

const CONFIRM_WORD = 'DELETE'

export function UsersMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: UserMultiDeleteDialogProps<TData>) {
  const [value, setValue] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const queryClient = useQueryClient()
  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleDelete = async () => {
    if (value.trim() !== CONFIRM_WORD) {
      toast.error(`Please type "${CONFIRM_WORD}" to confirm.`)
      return
    }
    if (isDeleting) return

    const selectedIds = selectedRows.map((row) => (row.original as { id: string }).id)
    if (selectedIds.length === 0) return

    setIsDeleting(true)
    const results = await Promise.allSettled(
      selectedIds.map((id) => usersService.deleteUser(id))
    )
    setIsDeleting(false)

    const successCount = results.filter((result) => result.status === 'fulfilled').length
    const failureCount = results.length - successCount

    if (successCount > 0) {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
      table.resetRowSelection()
    }

    if (failureCount === 0) {
      toast.success(
        `Deleted ${successCount} ${successCount > 1 ? 'users' : 'user'} successfully`
      )
      setValue('')
      onOpenChange(false)
      return
    }

    toast.error(
      `Deleted ${successCount} user(s), ${failureCount} failed. Please retry or check permissions.`
    )
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) setValue('')
        onOpenChange(nextOpen)
      }}
      handleConfirm={handleDelete}
      disabled={value.trim() !== CONFIRM_WORD || isDeleting}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete {selectedRows.length} {selectedRows.length > 1 ? 'users' : 'user'}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete the selected users? <br />
            This action cannot be undone.
          </p>

          <Label className='my-4 flex flex-col items-start gap-1.5'>
            <span>Confirm by typing "{CONFIRM_WORD}":</span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Type "${CONFIRM_WORD}" to confirm.`}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={isDeleting ? 'Deleting...' : 'Delete'}
      destructive
    />
  )
}
