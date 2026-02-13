import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { t } from '@/i18n'
import { usersService } from '@/services/users.service'
import type { UpdateUserRequest } from '@/services/users.service'

type UseUsersOptions = {
  enabled?: boolean
}

export function useUsers(page = 1, limit = 10, options?: UseUsersOptions) {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => usersService.getUsers(page, limit),
    enabled: options?.enabled ?? true,
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => usersService.getUser(id),
    enabled: !!id,
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      usersService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(t('users.toasts.updated'))
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || t('users.toasts.updateFailed')
      toast.error(message)
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => usersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success(t('users.toasts.deleted'))
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || t('users.toasts.deleteFailed')
      toast.error(message)
    },
  })
}
