'use client'

import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { useQueryClient } from '@tanstack/react-query'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { t } from '@/i18n'
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
      toast.error(t('users.toasts.multiDeleteNeedWord', { word: CONFIRM_WORD }))
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
      toast.success(t('users.toasts.multiDeleteSuccess', { count: successCount }))
      setValue('')
      onOpenChange(false)
      return
    }

    toast.error(
      t('users.toasts.multiDeletePartialFail', {
        success: successCount,
        failed: failureCount,
      })
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
          {t('users.multiDeleteDialog.title', { count: selectedRows.length })}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('users.multiDeleteDialog.description')}
          </p>

          <Label className='my-4 flex flex-col items-start gap-1.5'>
            <span>
              {t('users.multiDeleteDialog.confirmTip', { word: CONFIRM_WORD })}
            </span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('users.placeholders.confirmWord', {
                word: CONFIRM_WORD,
              })}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('common.warning')}</AlertTitle>
            <AlertDescription>
              {t('users.multiDeleteDialog.warning')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={
        isDeleting
          ? t('users.multiDeleteDialog.deleting')
          : t('users.multiDeleteDialog.confirm')
      }
      destructive
    />
  )
}
