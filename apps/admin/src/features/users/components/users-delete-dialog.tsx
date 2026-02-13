'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { t } from '@/i18n'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDeleteUser } from '@/hooks/use-users'
import { roles } from '../data/data'
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
  const roleLabel = roles.find((role) => role.value === currentRow.role)?.label ?? currentRow.role

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
          {t('users.deleteDialog.title')}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('users.deleteDialog.description', {
              username: currentRow.username,
              role: roleLabel,
            })}
          </p>

          <Label className='my-2'>
            {t('users.deleteDialog.usernameLabel')}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('users.placeholders.confirmDeleteUser')}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('common.warning')}</AlertTitle>
            <AlertDescription>
              {t('users.deleteDialog.warning')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={
        deleteUser.isPending
          ? t('users.deleteDialog.deleting')
          : t('users.deleteDialog.confirm')
      }
      destructive
    />
  )
}
