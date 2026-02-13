import { useEffect } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useDirection } from '@/context/direction-provider'
import { useLayout } from '@/context/layout-provider'
import { t } from '@/i18n'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useSidebar } from '@/components/ui/sidebar'

const displayFormSchema = z.object({
  sidebarVariant: z.enum(['inset', 'floating', 'sidebar']),
  layoutMode: z.enum(['default', 'compact', 'full']),
  direction: z.enum(['ltr', 'rtl']),
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

function getLayoutMode(open: boolean, collapsible: 'offcanvas' | 'icon' | 'none') {
  if (open) return 'default' as const
  return collapsible === 'offcanvas' ? ('full' as const) : ('compact' as const)
}

export function DisplayForm() {
  const { variant, setVariant, collapsible, setCollapsible, defaultCollapsible } =
    useLayout()
  const { dir, setDir } = useDirection()
  const { open, setOpen } = useSidebar()

  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: {
      sidebarVariant: variant,
      layoutMode: getLayoutMode(open, collapsible),
      direction: dir,
    },
  })

  useEffect(() => {
    form.reset({
      sidebarVariant: variant,
      layoutMode: getLayoutMode(open, collapsible),
      direction: dir,
    })
  }, [collapsible, dir, form, open, variant])

  function onSubmit(data: DisplayFormValues) {
    if (data.sidebarVariant !== variant) setVariant(data.sidebarVariant)
    if (data.direction !== dir) setDir(data.direction)

    if (data.layoutMode === 'default') {
      setOpen(true)
      setCollapsible(defaultCollapsible)
    } else {
      setOpen(false)
      setCollapsible(data.layoutMode === 'full' ? 'offcanvas' : 'icon')
    }

    toast.success(t('settings.display.updated'))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='sidebarVariant'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.display.sidebarStyle')}</FormLabel>
              <div className='relative w-max'>
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[220px] appearance-none font-normal capitalize',
                      'dark:bg-background dark:hover:bg-background'
                    )}
                    {...field}
                  >
                    <option value='inset'>{t('settings.appearance.sidebarInset')}</option>
                    <option value='floating'>{t('settings.appearance.sidebarFloating')}</option>
                    <option value='sidebar'>{t('settings.appearance.sidebarStandard')}</option>
                  </select>
                </FormControl>
                <ChevronDownIcon className='absolute end-3 top-2.5 h-4 w-4 opacity-50' />
              </div>
              <FormDescription>{t('settings.display.sidebarStyleDesc')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='layoutMode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.display.layoutMode')}</FormLabel>
              <div className='relative w-max'>
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[220px] appearance-none font-normal capitalize',
                      'dark:bg-background dark:hover:bg-background'
                    )}
                    {...field}
                  >
                    <option value='default'>{t('settings.appearance.layoutDefault')}</option>
                    <option value='compact'>{t('settings.appearance.layoutCompact')}</option>
                    <option value='full'>{t('settings.appearance.layoutFull')}</option>
                  </select>
                </FormControl>
                <ChevronDownIcon className='absolute end-3 top-2.5 h-4 w-4 opacity-50' />
              </div>
              <FormDescription>{t('settings.display.layoutModeDesc')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='direction'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('settings.display.direction')}</FormLabel>
              <div className='relative w-max'>
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[220px] appearance-none font-normal uppercase',
                      'dark:bg-background dark:hover:bg-background'
                    )}
                    {...field}
                  >
                    <option value='ltr'>{t('settings.appearance.ltr')}</option>
                    <option value='rtl'>{t('settings.appearance.rtl')}</option>
                  </select>
                </FormControl>
                <ChevronDownIcon className='absolute end-3 top-2.5 h-4 w-4 opacity-50' />
              </div>
              <FormDescription>{t('settings.display.directionDesc')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>{t('settings.display.submit')}</Button>
      </form>
    </Form>
  )
}
