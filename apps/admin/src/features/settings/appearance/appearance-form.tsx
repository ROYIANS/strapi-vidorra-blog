import { type SVGProps } from 'react'
import { Item } from '@radix-ui/react-radio-group'
import { CircleCheck } from 'lucide-react'
import { toast } from 'sonner'
import { IconDir } from '@/assets/custom/icon-dir'
import { IconLayoutCompact } from '@/assets/custom/icon-layout-compact'
import { IconLayoutDefault } from '@/assets/custom/icon-layout-default'
import { IconLayoutFull } from '@/assets/custom/icon-layout-full'
import { IconSidebarFloating } from '@/assets/custom/icon-sidebar-floating'
import { IconSidebarInset } from '@/assets/custom/icon-sidebar-inset'
import { IconSidebarSidebar } from '@/assets/custom/icon-sidebar-sidebar'
import { fontSchemes } from '@/config/fonts'
import { useDirection } from '@/context/direction-provider'
import { type Collapsible, useLayout } from '@/context/layout-provider'
import { useTheme } from '@/context/theme-provider'
import { useThemeColor } from '@/context/theme-color-provider'
import { useFont } from '@/context/font-provider'
import { getLocale, setLocale, t } from '@/i18n'
import { type ThemeColorName, themeColors } from '@/lib/theme-colors'
import { cn } from '@/lib/utils'
import { RadioGroup, RadioGroupItem as RadioItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { useSidebar } from '@/components/ui/sidebar'

function resolveLayoutValue(open: boolean, collapsible: 'offcanvas' | 'icon' | 'none') {
  if (open) return 'default' as const
  return collapsible === 'offcanvas' ? ('offcanvas' as const) : ('icon' as const)
}

export function AppearanceForm() {
  const { open, setOpen } = useSidebar()
  const { theme, setTheme } = useTheme()
  const { themeColor, setThemeColor } = useThemeColor()
  const { font, setFont } = useFont()
  const { variant, setVariant, collapsible, setCollapsible } = useLayout()
  const { dir, setDir } = useDirection()
  const locale = getLocale()

  const resolvedTheme = theme === 'system' ? 'light' : theme
  const layoutValue = resolveLayoutValue(open, collapsible)

  const changeLayout = (next: 'default' | 'icon' | 'offcanvas') => {
    if (next === 'default') {
      setOpen(true)
      return
    }
    setOpen(false)
    setCollapsible(next as Collapsible)
  }

  const changeLocale = (nextLocale: 'zh-CN' | 'en-US') => {
    if (nextLocale === locale) return
    setLocale(nextLocale)
    toast.success(t('settings.appearance.languageUpdated'))
    window.setTimeout(() => window.location.reload(), 120)
  }

  return (
    <div className='space-y-8'>
      <div>
        <h3 className='text-sm font-medium'>{t('settings.appearance.theme')}</h3>
        <p className='mt-1 text-sm text-muted-foreground'>{t('settings.appearance.themeDesc')}</p>
        <RadioGroup
          value={resolvedTheme}
          onValueChange={(value) => setTheme(value as 'light' | 'dark')}
          className='grid max-w-md grid-cols-2 gap-8 pt-4'
        >
          <div>
            <label className='[&:has([data-state=checked])>div]:border-primary cursor-pointer'>
              <RadioItem value='light' className='sr-only' />
              <div className='border-muted hover:border-accent items-center rounded-md border-2 p-1'>
                <div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
                  <div className='space-y-2 rounded-md bg-white p-2 shadow-xs'>
                    <div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
                    <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                  </div>
                  <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs'>
                    <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                    <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                  </div>
                  <div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs'>
                    <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                    <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                  </div>
                </div>
              </div>
              <span className='block w-full p-2 text-center font-normal'>
                {t('settings.appearance.light')}
              </span>
            </label>
          </div>
          <div>
            <label className='[&:has([data-state=checked])>div]:border-primary cursor-pointer'>
              <RadioItem value='dark' className='sr-only' />
              <div className='border-muted bg-popover hover:bg-accent hover:text-accent-foreground items-center rounded-md border-2 p-1'>
                <div className='space-y-2 rounded-sm bg-slate-950 p-2'>
                  <div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-xs'>
                    <div className='h-2 w-[80px] rounded-lg bg-slate-400' />
                    <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                  </div>
                  <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs'>
                    <div className='h-4 w-4 rounded-full bg-slate-400' />
                    <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                  </div>
                  <div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs'>
                    <div className='h-4 w-4 rounded-full bg-slate-400' />
                    <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                  </div>
                </div>
              </div>
              <span className='block w-full p-2 text-center font-normal'>
                {t('settings.appearance.dark')}
              </span>
            </label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className='text-sm font-medium'>{t('settings.appearance.themeColor')}</h3>
        <p className='mt-1 text-sm text-muted-foreground'>
          {t('settings.appearance.themeColorDesc')}
        </p>
        <RadioGroup
          value={themeColor}
          onValueChange={(value) => setThemeColor(value as ThemeColorName)}
          className='grid max-w-lg grid-cols-2 gap-2 pt-4 md:grid-cols-4'
        >
          {(Object.keys(themeColors) as ThemeColorName[]).map((colorName) => (
            <div key={colorName}>
              <label className='[&:has([data-state=checked])>div]:border-primary cursor-pointer'>
                <RadioItem value={colorName} className='sr-only' />
                <div className='border-muted hover:border-accent flex items-center gap-2 rounded-md border-2 px-3 py-2 transition-colors'>
                  <div
                    className='h-5 w-5 flex-shrink-0 rounded-full border border-border shadow-sm'
                    style={{ backgroundColor: themeColors[colorName].light.primary }}
                  />
                  <span className='text-sm font-medium whitespace-nowrap'>
                    {themeColors[colorName].label}
                  </span>
                </div>
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      <div className='space-y-3'>
        <div>
          <h3 className='text-sm font-medium'>{t('settings.appearance.fontScheme')}</h3>
          <p className='mt-1 text-sm text-muted-foreground'>
            {t('settings.appearance.fontSchemeDesc')}
          </p>
        </div>
        <div className='grid max-w-2xl grid-cols-1 gap-3 pt-2 md:grid-cols-3'>
          {fontSchemes.map((scheme) => (
            <button
              key={scheme.id}
              type='button'
              onClick={() => setFont(scheme.id)}
              className={cn(
                'text-left rounded-lg border-2 px-4 py-3 transition-all',
                'hover:border-accent hover:shadow-sm',
                font === scheme.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-muted'
              )}
            >
              <div className={cn('space-y-1', scheme.className)}>
                <div className='flex items-center justify-between'>
                  <div className='text-sm font-semibold'>{scheme.name}</div>
                  {font === scheme.id && <CircleCheck className='h-4 w-4 text-primary' />}
                </div>
                <div className='text-xs text-muted-foreground'>{scheme.description}</div>
                <div className='pt-1 text-xs opacity-75'>{scheme.preview}</div>
              </div>
            </button>
          ))}
        </div>
        <p className='text-xs text-muted-foreground'>{t('settings.appearance.fontTip')}</p>
      </div>

      <Separator />

      <div className='space-y-3'>
        <div>
          <h3 className='text-sm font-medium'>{t('settings.appearance.language')}</h3>
          <p className='mt-1 text-sm text-muted-foreground'>
            {t('settings.appearance.languageDesc')}
          </p>
        </div>
        <div className='grid max-w-lg grid-cols-1 gap-3 pt-2 md:grid-cols-2'>
          <button
            type='button'
            onClick={() => changeLocale('zh-CN')}
            className={cn(
              'rounded-md border-2 px-4 py-3 text-left transition-colors',
              locale === 'zh-CN'
                ? 'border-primary bg-primary/5'
                : 'border-muted hover:border-accent'
            )}
          >
            <div className='text-sm font-medium'>{t('settings.appearance.languageZhCn')}</div>
            <div className='text-xs text-muted-foreground'>Simplified Chinese</div>
          </button>
          <button
            type='button'
            onClick={() => changeLocale('en-US')}
            className={cn(
              'rounded-md border-2 px-4 py-3 text-left transition-colors',
              locale === 'en-US'
                ? 'border-primary bg-primary/5'
                : 'border-muted hover:border-accent'
            )}
          >
            <div className='text-sm font-medium'>{t('settings.appearance.languageEnUs')}</div>
            <div className='text-xs text-muted-foreground'>English (US)</div>
          </button>
        </div>
      </div>

      <Separator />

      <div className='max-md:hidden'>
        <h3 className='text-sm font-medium'>{t('settings.appearance.sidebarStyle')}</h3>
        <p className='mt-1 text-sm text-muted-foreground'>
          {t('settings.appearance.sidebarStyleDesc')}
        </p>
        <RadioGroup
          value={variant}
          onValueChange={(value) => setVariant(value as 'inset' | 'floating' | 'sidebar')}
          className='grid max-w-md grid-cols-3 gap-8 pt-4'
        >
          <RadioGroupItemWithIcon value='inset' label={t('settings.appearance.sidebarInset')} icon={IconSidebarInset} />
          <RadioGroupItemWithIcon value='floating' label={t('settings.appearance.sidebarFloating')} icon={IconSidebarFloating} />
          <RadioGroupItemWithIcon value='sidebar' label={t('settings.appearance.sidebarStandard')} icon={IconSidebarSidebar} />
        </RadioGroup>
      </div>

      <Separator />

      <div className='max-md:hidden'>
        <h3 className='text-sm font-medium'>{t('settings.appearance.layoutMode')}</h3>
        <p className='mt-1 text-sm text-muted-foreground'>
          {t('settings.appearance.layoutModeDesc')}
        </p>
        <RadioGroup
          value={layoutValue}
          onValueChange={(value) => changeLayout(value as 'default' | 'icon' | 'offcanvas')}
          className='grid max-w-md grid-cols-3 gap-8 pt-4'
        >
          <RadioGroupItemWithIcon value='default' label={t('settings.appearance.layoutDefault')} icon={IconLayoutDefault} />
          <RadioGroupItemWithIcon value='icon' label={t('settings.appearance.layoutCompact')} icon={IconLayoutCompact} />
          <RadioGroupItemWithIcon value='offcanvas' label={t('settings.appearance.layoutFull')} icon={IconLayoutFull} />
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className='text-sm font-medium'>{t('settings.appearance.direction')}</h3>
        <p className='mt-1 text-sm text-muted-foreground'>
          {t('settings.appearance.directionDesc')}
        </p>
        <RadioGroup
          value={dir}
          onValueChange={(value) => setDir(value as 'ltr' | 'rtl')}
          className='grid max-w-md grid-cols-2 gap-8 pt-4'
        >
          <RadioGroupItemWithIcon
            value='ltr'
            label={t('settings.appearance.ltr')}
            icon={(props: SVGProps<SVGSVGElement>) => <IconDir dir='ltr' {...props} />}
          />
          <RadioGroupItemWithIcon
            value='rtl'
            label={t('settings.appearance.rtl')}
            icon={(props: SVGProps<SVGSVGElement>) => <IconDir dir='rtl' {...props} />}
          />
        </RadioGroup>
      </div>
    </div>
  )
}

function RadioGroupItemWithIcon({
  value,
  label,
  icon: Icon,
}: {
  value: string
  label: string
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement
}) {
  return (
    <Item
      value={value}
      className={cn('group outline-none', 'transition duration-200 ease-in')}
    >
      <div
        className={cn(
          'ring-border relative rounded-[6px] ring-[1px]',
          'group-data-[state=checked]:ring-primary group-data-[state=checked]:shadow-2xl',
          'group-focus-visible:ring-2'
        )}
      >
        <CircleCheck
          className={cn(
            'fill-primary size-6 stroke-white',
            'group-data-[state=unchecked]:hidden',
            'absolute top-0 right-0 translate-x-1/2 -translate-y-1/2'
          )}
        />
        <Icon
          className={cn(
            'stroke-primary fill-primary',
            'group-data-[state=unchecked]:stroke-muted-foreground',
            'group-data-[state=unchecked]:fill-muted-foreground'
          )}
        />
      </div>
      <div className='mt-1 text-center text-xs'>{label}</div>
    </Item>
  )
}
