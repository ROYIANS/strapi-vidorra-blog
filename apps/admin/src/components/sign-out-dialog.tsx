import { useClerk } from '@clerk/clerk-react'
import { t } from '@/i18n'
import { ConfirmDialog } from '@/components/confirm-dialog'

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const { signOut } = useClerk()

  const handleSignOut = async () => {
    await signOut({ redirectUrl: '/sign-in' })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('auth.signOut.title')}
      desc={t('auth.signOut.description')}
      confirmText={t('auth.signOut.confirm')}
      destructive
      handleConfirm={handleSignOut}
      className='sm:max-w-sm'
    />
  )
}
