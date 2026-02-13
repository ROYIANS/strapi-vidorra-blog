import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthProfile } from '@/hooks/use-auth-profile'
import { useUsers } from './users-provider'

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers()
  const { data: currentUser } = useAuthProfile()

  if (currentUser?.role !== 'ADMIN') {
    return null
  }

  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add User</span> <UserPlus size={18} />
      </Button>
    </div>
  )
}
