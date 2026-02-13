'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDeleteUser } from '@/hooks/use-users'
import { type User } from '../data/schema'

type UserDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
}: UserDeleteDialogProps) {
  const [value, setValue] = useState('')
  const deleteUser = useDeleteUser()

  const handleDelete = async () => {
    if (value.trim() !== currentRow.username || deleteUser.isPending) return

    try {
      await deleteUser.mutateAsync(currentRow.id)
      setValue('')
      onOpenChange(false)
    } catch {
      // Errors are surfaced by mutation hooks.
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setValue('')
        }
        onOpenChange(nextOpen)
      }}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username || deleteUser.isPending}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Delete User
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete{' '}
            <span className='font-bold'>{currentRow.username}</span>?
            <br />
            This action will permanently remove the user with the role of{' '}
            <span className='font-bold'>{currentRow.role.toUpperCase()}</span>{' '}
            from the system. This cannot be undone.
          </p>

          <Label className='my-2'>
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter username to confirm deletion.'
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
      confirmText={deleteUser.isPending ? 'Deleting...' : 'Delete'}
      destructive
    />
  )
}
