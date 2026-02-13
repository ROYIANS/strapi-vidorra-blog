'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { t } from '@/i18n'
import { SelectDropdown } from '@/components/select-dropdown'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
import { Switch } from '@/components/ui/switch'
import { useUpdateUser } from '@/hooks/use-users'
import { roles } from '../data/data'
import { type User } from '../data/schema'

const userRoleSchema = z.union([
  z.literal('READER'),
  z.literal('EDITOR'),
  z.literal('ADMIN'),
])

const formSchema = z.object({
  role: userRoleSchema,
  isActive: z.boolean(),
})

type UserForm = z.infer<typeof formSchema>

type UserActionDialogProps = {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

function buildDefaultValues(currentRow: User): UserForm {
  return {
    role: currentRow.role,
    isActive: currentRow.isActive,
  }
}

export function UsersActionDialog({
  currentRow,
  open,
  onOpenChange,
}: UserActionDialogProps) {
  const updateUser = useUpdateUser()

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? buildDefaultValues(currentRow)
      : { role: 'READER', isActive: true },
  })

  useEffect(() => {
    if (!currentRow) return
    form.reset(buildDefaultValues(currentRow))
  }, [currentRow, form, open])

  if (!currentRow) return null

  const onSubmit = async (values: UserForm) => {
    try {
      await updateUser.mutateAsync({
        id: currentRow.id,
        data: {
          role: values.role,
          isActive: values.isActive,
        },
      })
      form.reset(buildDefaultValues(currentRow))
      onOpenChange(false)
    } catch {
      // Errors are surfaced by mutation hooks.
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          form.reset(buildDefaultValues(currentRow))
        }
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>{t('users.editUser')}</DialogTitle>
          <DialogDescription>{t('users.editUserDesc')}</DialogDescription>
        </DialogHeader>
        <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                <FormLabel className='col-span-2 text-end'>{t('users.fields.email')}</FormLabel>
                <Input value={currentRow.email} className='col-span-4' disabled />
              </FormItem>

              <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                <FormLabel className='col-span-2 text-end'>
                  {t('users.fields.username')}
                </FormLabel>
                <Input value={currentRow.username} className='col-span-4' disabled />
              </FormItem>

              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('users.fields.role')}
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('users.placeholders.role')}
                      className='col-span-4'
                      disabled={updateUser.isPending}
                      isControlled
                      items={roles.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      {t('users.fields.status')}
                    </FormLabel>
                    <div className='col-span-4 flex items-center gap-3'>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={updateUser.isPending}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value ? t('common.active') : t('common.inactive')}
                      </FormDescription>
                    </div>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form' disabled={updateUser.isPending}>
            {updateUser.isPending ? t('common.saving') : t('common.saveChanges')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
