import { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { t } from '@/i18n'
import { useAuthProfile } from '@/hooks/use-auth-profile'
import { authService, type AuthProfile } from '@/services/auth.service'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'

const accountFormSchema = z.object({
  name: z.string().max(80, t('settings.account.validation.nameMax')).optional(),
  avatar: z
    .string()
    .max(2048, t('settings.account.validation.avatarMax'))
    .optional(),
  bio: z.string().max(280, t('settings.account.validation.bioMax')).optional(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

function getDefaultValues(profile?: AuthProfile | null, clerk?: ReturnType<typeof useUser>['user']): AccountFormValues {
  return {
    name: profile?.name ?? clerk?.fullName ?? '',
    avatar: profile?.avatar ?? clerk?.imageUrl ?? '',
    bio: profile?.bio ?? '',
  }
}

export function AccountForm() {
  const queryClient = useQueryClient()
  const { user: clerkUser } = useUser()
  const { data: profile, isLoading } = useAuthProfile()

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: getDefaultValues(),
  })

  useEffect(() => {
    form.reset(getDefaultValues(profile, clerkUser))
  }, [clerkUser, form, profile])

  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(['auth', 'profile'], updatedProfile)
      toast.success(t('settings.account.toast.updated'))
    },
    onError: () => {
      toast.error(t('settings.account.toast.updateFailed'))
    },
  })

  function onSubmit(values: AccountFormValues) {
    updateProfileMutation.mutate(values)
  }

  const email = profile?.email ?? clerkUser?.primaryEmailAddress?.emailAddress ?? ''
  const username = profile?.username ?? clerkUser?.username ?? clerkUser?.id ?? ''

  if (isLoading && !profile) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-28 w-full' />
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid gap-4 md:grid-cols-2'>
          <FormItem>
            <FormLabel>{t('settings.account.email')}</FormLabel>
            <FormControl>
              <Input value={email} disabled />
            </FormControl>
            <FormDescription>{t('settings.account.emailDesc')}</FormDescription>
          </FormItem>
          <FormItem>
            <FormLabel>{t('settings.account.username')}</FormLabel>
            <FormControl>
              <Input value={username} disabled />
            </FormControl>
            <FormDescription>{t('settings.account.usernameDesc')}</FormDescription>
          </FormItem>
        </div>

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.account.displayName')}</FormLabel>
              <FormControl>
                <Input placeholder={t('settings.account.displayNamePlaceholder')} {...field} />
              </FormControl>
              <FormDescription>{t('settings.account.displayNameDesc')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='avatar'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.account.avatar')}</FormLabel>
              <FormControl>
                <Input placeholder='https://example.com/avatar.png' {...field} />
              </FormControl>
              <FormDescription>{t('settings.account.avatarDesc')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.account.bio')}</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder={t('settings.account.bioPlaceholder')}
                  className='resize-y'
                  {...field}
                />
              </FormControl>
              <FormDescription>{t('settings.account.bioDesc')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={updateProfileMutation.isPending}>
          {updateProfileMutation.isPending
            ? t('common.saving')
            : t('common.saveChanges')}
        </Button>
      </form>
    </Form>
  )
}
