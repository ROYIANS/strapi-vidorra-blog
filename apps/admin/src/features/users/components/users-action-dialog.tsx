'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { PasswordInput } from '@/components/password-input'
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
import { useCreateUser, useUpdateUser } from '@/hooks/use-users'
import { roles } from '../data/data'
import { type User } from '../data/schema'

const userRoleSchema = z.union([
  z.literal('USER'),
  z.literal('ADMIN'),
  z.literal('EDITOR'),
])

const formSchema = z
  .object({
    email: z.email({
      error: (iss) => (iss.input === '' ? 'Email is required.' : undefined),
    }),
    username: z.string().min(3, 'Username must be at least 3 characters.'),
    name: z.string().optional(),
    role: userRoleSchema,
    isActive: z.boolean(),
    password: z.string().transform((pwd) => pwd.trim()),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit && !password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password'],
        message: 'Password is required.',
      })
      return
    }

    if (password && password.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password'],
        message: 'Password must be at least 6 characters long.',
      })
    }

    if (password && password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'],
        message: "Passwords don't match.",
      })
    }
  })

type UserForm = z.infer<typeof formSchema>

type UserActionDialogProps = {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

function buildDefaultValues(currentRow?: User): UserForm {
  const isEdit = !!currentRow
  if (isEdit && currentRow) {
    return {
      email: currentRow.email,
      username: currentRow.username,
      name: currentRow.name ?? '',
      role: currentRow.role,
      isActive: currentRow.isActive,
      password: '',
      confirmPassword: '',
      isEdit: true,
    }
  }

  return {
    email: '',
    username: '',
    name: '',
    role: 'USER',
    isActive: true,
    password: '',
    confirmPassword: '',
    isEdit: false,
  }
}

export function UsersActionDialog({
  currentRow,
  open,
  onOpenChange,
}: UserActionDialogProps) {
  const isEdit = !!currentRow
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: buildDefaultValues(currentRow),
  })

  useEffect(() => {
    form.reset(buildDefaultValues(currentRow))
  }, [currentRow, form, open])

  const onSubmit = async (values: UserForm) => {
    const payload = {
      email: values.email.trim(),
      username: values.username.trim(),
      name: values.name?.trim() ? values.name.trim() : undefined,
      role: values.role,
    }

    try {
      if (isEdit && currentRow) {
        await updateUser.mutateAsync({
          id: currentRow.id,
          data: {
            ...payload,
            isActive: values.isActive,
            ...(values.password ? { password: values.password } : {}),
          },
        })
      } else {
        await createUser.mutateAsync({
          ...payload,
          password: values.password,
        })
      }
      form.reset(buildDefaultValues(currentRow))
      onOpenChange(false)
    } catch {
      // Errors are surfaced by mutation hooks.
    }
  }

  const isPending = createUser.isPending || updateUser.isPending

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
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update user information and role.'
              : 'Create a local managed user for admin operations.'}
          </DialogDescription>
        </DialogHeader>
        <div className='h-105 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='john.doe@gmail.com'
                        className='col-span-4'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='john_doe'
                        className='col-span-4'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John Doe'
                        className='col-span-4'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Role</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a role'
                      className='col-span-4'
                      disabled={isPending}
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
              {isEdit && (
                <FormField
                  control={form.control}
                  name='isActive'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-end'>Status</FormLabel>
                      <div className='col-span-4 flex items-center gap-3'>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormDescription>
                          {field.value ? 'Active' : 'Inactive'}
                        </FormDescription>
                      </div>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={
                          isEdit
                            ? 'Leave empty to keep current password'
                            : 'At least 6 characters'
                        }
                        className='col-span-4'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='Repeat password'
                        className='col-span-4'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form' disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
